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
  const discourseAPI = new Discourse("https://discourse02.cse.unsw.edu.au/25T3/COMP6080", {
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
      url: `https://discourse02.cse.unsw.edu.au/${term}/COMP6080/t/${t.id}`,
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
  const { stdout } = shell.exec(`rm -rf /tmp/gl && git clone git@gitlab.cse.unsw.edu.au:undergraduate-courses/COMP6080/${term}/STAFF/administration.git /tmp/gl && cd /tmp/gl && cat groups.csv`)
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
    repoPath = `https://gitlab.cse.unsw.edu.au/undergraduate-courses/COMP6080/${term}/students/z${zid}/${newRepo}`
    if (isTutor(zid, term)) {
      repoPath = `https://gitlab.cse.unsw.edu.au/undergraduate-courses/COMP6080/${term}/STAFF/repos/${newRepo}`
    } else if (['ass4'].includes(repo)) {
      const group = (await getGroups(term))[zid];
      repoPath = `https://gitlab.cse.unsw.edu.au/undergraduate-courses/COMP6080/${term}/groups/${group}/${newRepo}`
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

  const includeMain = [
    'ass1',
    'ass2',
    'ass3',
    'ass4',
    'exam',
    'final',
    'PASSED_HURDLE',
    'PASSED_COURSE',
  ];
  const includeAss1 = [
    'ass1_q1',
    'ass1_q2',
    'ass1_q3',
    'ass1_other_penalty',
    'ass1_git_penalty',
    'ass1_git_score',
    'ass1_before_penalty',
    'ass1_git_score_comments',
    'ass1_tutor_who_marked',
    'ass1_tutor_who_marked_email',
    'ass1_q1_comments',
    'ass1_q2_comments',
    'ass1_q3_comments',
  ];
  const includeAss2 = [
    'ass2_compliance',
    'ass2_code_quality_comments',
    'ass2_code_quality',
    'ass2_git_score',
    'ass2_git_penalty',
    'ass2_other_penalty',
    'ass2_before_penalty',
    'ass2_git_score_comments',
    'ass2_tutor_who_marked',
    'ass2_tutor_who_marked_email',
  ];
  const includeAss3 = [
    'ass3_git_score',
    'ass3_git_penalty',
    'ass3_other_penalty',
    'ass3_compliance_m1',
    'ass3_compliance_m2',
    'ass3_compliance_m3',
    'ass3_compliance_m4',
    'ass3_compliance_m5',
    'ass3_compliance_m6',
    'ass3_compliance_m7',
    'ass3_compliance_m1_comments',
    'ass3_compliance_m2_comments',
    'ass3_compliance_m2_raw_comments',
    'ass3_compliance_m3_comments',
    'ass3_compliance_m4_comments',
    'ass3_compliance_m5_comments',
    'ass3_compliance_m6_comments',
    'ass3_compliance_m6_raw_comments',
    'ass3_compliance_m7_comments',
    'ass3_bonus_comments',
    'ass3_bonus',
    'ass3_mobile_responsive',
    'ass3_code_style_comments',
    'ass3_code_style',
    'ass3_usability_accessibility',
    'ass3_comments_milestones',
    'ass3_mobile_responsive_comments',
    'ass3_usability_accessibility_comments',
    'ass3_comments_codequal',
    'ass3_tutor_who_marked',
    'ass3_other_penalty_comments',
    'ass3_tutor_who_marked_email',
    'ass3_before_penalty',
    'ass3_git_score_comments',
  ];
  const includeAss4 = [
    'ass4_before_penalty',
    'ass4_git_score',
    'ass4_git_penalty',
    'ass4_other_penalty_deduction',
    'ass4_compliance_m1',
    'ass4_compliance_m2',
    'ass4_compliance_m3',
    'ass4_compliance_m4',
    'ass4_compliance_m5',
    'ass4_compliance_m6',
    'ass4_compliance_m1_comments',
    'ass4_compliance_m2_comments',
    'ass4_compliance_m3_comments',
    'ass4_compliance_m4_comments',
    'ass4_compliance_m5_comments',
    'ass4_compliance_m6_comments',
    'ass4_mobile_responsive',
    'ass4_mobile_responsive_comments',
    'ass4_deployment',
    'ass4_linting_comments',
    'ass4_linting',
    'ass4_testing',
    'ass4_bonus',
    'ass4_bonus_comments',
    'ass4_code_style',
    'ass4_code_style_comments',
    'ass4_usability_accessibility',
    'ass4_deployment_comments',
    'ass4_usability_accessibility_comments',
    'ass4_testing_comments',
    'ass4_comments_bonus',
    'ass4_tutor_who_marked',
    'ass4_tutor_who_marked_email',
    'ass4_git_score_comments',
    'ass4_other_penalty_comments',
  ];


  let eachLine = shellresult.trim().split('\n')
  eachLine.sort();
  const results = eachLine.map(splitOnFirstSpace);

  console.log(results);

  res.json({
    main: results.filter(r => includeMain.includes(r[0])),
    ass1: results.filter(r => includeAss1.includes(r[0])),
    ass2: results.filter(r => includeAss2.includes(r[0])),
    ass3: results.filter(r => includeAss3.includes(r[0])),
    ass4: results.filter(r => includeAss4.includes(r[0])),
  })

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
