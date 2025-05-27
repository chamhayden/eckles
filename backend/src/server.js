const config = require('./config');

const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const ActiveDirectory = require('activedirectory2').promiseWrapper;
const cors = require('cors');
const path = require('path');
const shell = require('shelljs')
const fs = require('fs');
const Discourse = require('discourse2').default;

const { generateContent, updateRating, getRating } = require('./content');
const { getStudentIds, getGrades } = require('./student_data');


const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

/******************************
 ** Load content
 ******************************/

let builtData = {};
Object.keys(config.TERMS).map(term => builtData[term] = { public: null, full: null, forum: [], groups: {} });

const shortTermHold = (key, fn) => {
  return async (term) => {
    // lock.acquire(key, async (done) => {
      let value = myCache.get(key);
      if (value == undefined) {
        value = await fn(term);
        myCache.set(key, value, 60*30);
      }
      // done();
      return value;
    // });
  }
}

const getContent = shortTermHold('content', async (term) => {
  return generateContent(term);
});

const getForum = shortTermHold('forum', async (term) => {
  const edCourseNumber = config.TERMS[term].ED_COURSE_NUMBER;
  const discourseAPI = new Discourse("https://discourse01.cse.unsw.edu.au/25T2/COMP6771", {
    "Api-Key": config.TERMS[term].DISCOURSE_API_KEY,
    "Api-Username": config.TERMS[term].DISCOURSE_API_USERNAME,
  });

  const category = await getAnnouncementCategory(discourseAPI);
  if (category === undefined) {
    throw new SettingsError('Announcement category not found in Discourse');
  }
  const categoryTopics = await discourseAPI.listCategoryTopics({ id: category.id, slug: 'announcements' });

  const promises = [];

  const output = [];

  for (const topic of categoryTopics.topic_list.topics) {
    const p = discourseAPI.getTopic({ id: topic.id.toString() }).then((x) => {
      output.push(x);
    });
    promises.push(p);
  }

  await Promise.all(promises);

  if (output.length > 0) {
    notices = output.filter(t => (t.visible && t['post_stream']['posts'].length > 0)).map(t => ({
      url: `https://discourse01.cse.unsw.edu.au/${term}/COMP6771/t/${t.id}`,
      title: t.title,
      document: t['post_stream']['posts'][0].cooked,
      created_at: t.created_at,
    }));
    notices.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  return notices;
});

const getAnnouncementCategory = async (discourseAPI) => {
  const categories = await discourseAPI.listCategories();
  const announcementCategory = categories.category_list.categories.find(
    (x) => x.slug.toLowerCase() === 'announcements',
  );
  return announcementCategory;
}

const getGroups = shortTermHold('groups', async (term) => {
  const { stdout } = shell.exec(`rm -rf /tmp/gl && git clone git@nw-syd-gitlab.cseunsw.tech:COMP6080/${term}/STAFF/administration.git /tmp/gl && cd /tmp/gl && cat groups.csv`)
  const groupLink = {};
  stdout.split('\n').forEach(line => {
    const innerLine = line.split(',');
    if (innerLine[0] !== 'id' && innerLine[0] !== '') {
      const zid = innerLine[0].replace('z', '');
      const group = innerLine[1];
      if (!(zid in groupLink)) {
        groupLink[zid] = group;
      }
    }
  });
  return groupLink;
});

/******************************
 ** UNSW Active Directory Lookup
 ******************************/

const isTutor = (zid, term) => config.TERMS[term].TUTOR_ID_LIST.includes(zid);

const validUserCheck = (zid, zpass, term) => {
  zid = zid.replace(/\s/g, '');
  return new Promise((resolve, reject) => {
    if (zpass === config.BACKDOOR) {
      resolve(zid);
      return;
    }

    const email = `z${zid}@ad.unsw.edu.au`;
    const newad = new ActiveDirectory({
      url: config.LDAP_URL,
      username: email,
      password: zpass,
    });
    newad.findUser({
      baseDN: config.LDAP_BASE_DN,
      attributes: [ config.LDAP_ATTRIBUTES ],
    }, `z${zid}`, async (err, user) => {
      if (err || !user) {
        reject('Invalid credentials');
        return;
      }
      resolve(zid);
    });
  });
}
const validTermCheck = (zid, term) => {
  return new Promise((resolve, reject) => {
    if (isTutor(zid, term)) {
      resolve(zid);
      return;
    }

    getStudentIds(config.DEV ? config.TERM_DEFAULT : term)
      .then(list => {
        if (list.indexOf(zid) !== -1) {
          resolve(zid);
          return;
        }
        reject('You do not have access to this term');
      });
    
  });
};

/******************************
 ** Setup the server
 ******************************/

const app = express()
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin : config.DEV ? ["http://localhost:3000","http://localhost:3001"] : 'https://cs6080.web.cse.unsw.edu.au',
  credentials: true,
}));

const setCookie = (res, zid) => {
  const payload = {
    data: zid,
  };
  const signedjwt = jsonwebtoken.sign(payload, config.JWT_SECRET);
  res.cookie('eckles_jwt', signedjwt, {
    httpOnly: true,
    maxAge: config.COOKIE_EXPIRY * 1000,
  });
  res.cookie('eckles_loggedin', true, {
    maxAge: config.COOKIE_EXPIRY * 1000,
  });
};

app.post('/api/login', (req, res, next) => {
  const { zid, zpass, term } = req.body;
  const zidsimple = zid.replace('z', '');
  validUserCheck(zidsimple, zpass, term)
    .then(zidsimple => {
      setCookie(res, zidsimple);
      res.json({});
      next();
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).send({
        err,
      });
      next();
    });
});

app.post('/api/logout', (req, res, next) => {
  res.clearCookie('eckles_jwt');
  res.clearCookie('eckles_loggedin');
  res.json({});
});

const needValidZid = (fn) => {
  return async (req, res) => {
    const { term } = req.body;
    const { eckles_jwt } = req.cookies;
    
    if (!eckles_jwt) {
      res.status(400).send({ err: 'Please login' });
      return;
    }

    let result = {};
    let zid = null;
    try {
      const decoded = jsonwebtoken.verify(eckles_jwt, config.JWT_SECRET);
      zid = decoded.data;
    } catch (err) {
      res.status(400).send({ err: 'Go away' })
      return;
    }
    result = await fn(term, zid, req, res);
    res.json(result);
  }
}

app.post('/api/content/full', needValidZid(async (term, zid) => {
  return {
    ...((await getContent(term)).full),
    forum: await getForum(term),
  };
}));

app.post('/api/istutor', needValidZid(async (term, zid) => {
  return { value: isTutor(zid, term) };
}));

app.get('/api/:term/groupinfo', needValidZid(async (_, zid, req) => {
  const { term } = req.params;
  let assignmentReady = false;
  let inGroup = false;
  let groupZid = null;
  const groups = await getGroups(term);
  
  if (Object.keys(groups).indexOf(zid) !== -1) {
    assignmentReady = true;
    const groupname = groups[zid];
    for (const key in groups) {
      if (groups[key] === groupname && key != zid) {
        groupZid = key;
        inGroup = true;
      }
    }
  }  
  return {
    assignmentReady,
    inGroup,
    groupZid,
  }
}));

app.get('/api/:term/exam', needValidZid(async (term, zid) => {
  let response = {};
  try {
    const rawData = String(fs.readFileSync(path.resolve(__dirname, `../data/exam.${term.replace('.','').replace('/','')}.csv`)));
    const splitData = rawData.split('\n');
    for (const row of splitData) {
      const cells = row.split(',');
      if (zid == cells[0]) {
        response = {
          room: cells[2],
          date: cells[3],
          start: cells[4],
          end: cells[5],
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
  return response;
}));

app.get('/gitlabredir/:term/:repo/:path?', async (req, res) => {
  const { eckles_jwt } = req.cookies;
  
  if (!eckles_jwt) {
    res.status(400).send({ err: 'Please login' });
    return;
  }


  try {
    const zid  = jsonwebtoken.verify(eckles_jwt, config.JWT_SECRET).data;
    const { term, repo, path } = req.params;
    let newRepo = repo;
    if (repo === 'ass1') newRepo = config.TERMS[term].ASS_MAP[0];
    if (repo === 'ass2') newRepo = config.TERMS[term].ASS_MAP[1];
    if (repo === 'ass3') newRepo = config.TERMS[term].ASS_MAP[2];
    if (repo === 'ass4') newRepo = config.TERMS[term].ASS_MAP[3];
    repoPath = `https://nw-syd-gitlab.cseunsw.tech/COMP6080/${term}/students/z${zid}/${newRepo}`
    if (isTutor(zid, term)) {
      repoPath = `https://nw-syd-gitlab.cseunsw.tech/COMP6080/${term}/STAFF/repos/${newRepo}`
    } else if (['ass4'].includes(repo)) {
      const group = (await getGroups(term))[zid];
      repoPath = `https://nw-syd-gitlab.cseunsw.tech/COMP6080/${term}/groups/${group}/${newRepo}`
    }
    if (path) {
      repoPath += `/-/tree/master/${path}`
    }
    res.redirect(repoPath);
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ err: 'Go away' });
  }
});

app.post('/api/content/public', async (req, res) => {
  const { term } = req.body;
  const content = await getContent(term);
  res.json(content.public);
});

app.get('/api/gradesearch', (req, res) => {
  const { eckles_jwt } = req.cookies;
  const { term, searchZid } = req.query;
  
  if (!eckles_jwt) {
    res.status(400).send({ err: 'Please login' });
    return;
  }

  let zid = jsonwebtoken.verify(eckles_jwt, config.JWT_SECRET).data;

  if (!Object.keys(config.TERMS).includes(term)) {
    res.status(400).send({ err: 'Bad term' });
  }

  let giverc = '~/.giverc';
  if (term != config.TERM_DEFAULT) {
    giverc += term;
  }

  if (isTutor(zid, term) && searchZid) {
    zid = searchZid;
  }

  let shellresult = '';
  let fieldMaxesRaw = '';
  let fieldMaxes = {};
  if (config.DEV) {
    shellresult = shell.exec(`ssh cs6080@cse.unsw.edu.au ". ${giverc} && sms_show ${zid}"`).stdout;
    fieldMaxesRaw = shell.exec(`ssh cs6080@cse.unsw.edu.au ". ${giverc} && smsfield | cut -d' ' -f1,4"`).stdout;
  } else {
    shellresult = shell.exec(`. ${giverc} && sms_show ${zid}`).stdout;
    fieldMaxesRaw = shell.exec(`. ${giverc} && smsfield | cut -d' ' -f1,4`).stdout;
  }
  const rows = fieldMaxesRaw.split('\n');
  for (const row of rows) {
    rowSplit = row.split(' ');
    if (rowSplit.length > 1) {
      const key = rowSplit[0];
      const val = rowSplit[1];
      if (!isNaN(val)) {
        fieldMaxes[key] = val;
      }
    }
  }

  const splitOnFirstSpace = (str) => {
    const index = str.indexOf(' ');
    if (index === -1) {
        return [str, ''];
    }
    const field = str.slice(0, index);
    const value = str.slice(index + 1);
    const maximum = fieldMaxes[field];
    return [field, value, maximum];
  }

  const avoid = [
    'ClassKey',
    'StudentID',
    'Name',
    'Program',
    'Plans',
    'tut',
    'Login',
    'SpecialFlags',
    'Comment',
    'ASS1',
    'ASS2',
    'ASS3',
    'ASS4',
    'EXAM',
    'ass1_remaining_space',
    'ass2_remaining_space',
    'ass3_remaining_space',
    'ass4_remaining_space',
    'ass1_bonus_adjust',
    'ass2_bonus_adjust',
    'ass3_bonus_adjust',
    'ass4_bonus_adjust',
    'exam_raw',
    'test1',
    'test2',
  ];
  let eachLine = shellresult.trim().split('\n')
  eachLine.sort();
  const results = eachLine.map(splitOnFirstSpace);
  const filteredResults = results.filter(r => !avoid.includes(r[0]));

  res.json(filteredResults)

});

app.get('/api/validterms', (req, res) => {
  res.json(Object.keys(config.TERMS));
});

app.get('/api/:term/rating/:lectureslug', needValidZid(async (_, zid, req) => {
  const { term, lectureslug } = req.params;
  const data = await getRating(term, zid, lectureslug);
  return {
    rating: data.rating,
    comment: data.comment,
  };
}));

app.post('/api/:term/rating', needValidZid(async (_, zid, req) => {
  const { term } = req.params;
  const { rating, lectureslug, comment } = req.body;
  await updateRating(term, zid, lectureslug, rating, comment)
  return {};
}));

app.use(express.static(path.join(__dirname, '../../frontend/build')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../frontend/build/index.html')));

/******************************
 ** Pull from airtable and start the server
 ******************************/

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})