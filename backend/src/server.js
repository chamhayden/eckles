const config = require('./config');

const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const ActiveDirectory = require('activedirectory2').promiseWrapper;
const cors = require('cors');
const path = require('path');
const shell = require('shelljs')

const { generateContent } = require('./content');
const { getStudentIds, getGrades } = require('./student_data');


const AsyncLock = require('async-lock');
const lock = new AsyncLock();

/******************************
 ** Load content
 ******************************/

let builtData = {};
Object.keys(config.TERMS).map(term => builtData[term] = { public: null, full: null, forum: [], groups: {} });

const buildContent = (term) => {
  return ((innerTerm) => {
    return new Promise((resolve, reject) => {
      generateContent(innerTerm).then(({ full, public }) => {
        lock.acquire('data', (done) => {
          builtData[innerTerm].full = full;
          builtData[innerTerm].public = public;
          done();
        });
        setTimeout(() => buildContent(innerTerm), 1000 * 60 * 5); // 5 minutes
        resolve();
      }).catch(reject);
    });
  })(term);
};

const buildForum = (term) => {
  return ((innerTerm) => {
    return new Promise((resolve, reject) => {
      const edCourseNumber = config.TERMS[term].ED_COURSE_NUMBER;
      fetch(`https://edstem.org/api/courses/${edCourseNumber}/threads?limit=30&sort=new`, {
        method: 'GET',
        headers: {
          'X-Token': config.TERMS[term].ED_TOKEN,
        }
      }).then(r => r.json()).then(data => {
        if (data.threads) {
          const notices = data.threads.filter(t => t.is_pinned).map(t => ({
            url: `https://edstem.org/au/courses/${edCourseNumber}/discussion/${t.id}`,
            title: t.title,
            document: t.document,
            created_at: t.created_at,
          }));
          lock.acquire('data', (done) => {
            builtData[innerTerm].forum = notices;
            done();
            resolve();
          });
        } else {
          resolve();
        }
      });
      setTimeout(() => buildForum(innerTerm), 1000 * 60 * 10); // 10 minutes
    });
  })(term);
};

const parseGroups = (raw) => {
  const groupLink = {};
  raw.split('\n').forEach(line => {
    const innerLine = line.split(',');
    if (innerLine[0] !== 'id' && innerLine[0] !== '') {
      const zid = innerLine[0].replace('z', '');
      const group = innerLine[1];
      if (!(zid in groupLink)) {
        groupLink[zid] = group;
      }
    }
  })
  return groupLink;
};

const buildGroups = (term) => {
  return ((innerTerm) => {
    return new Promise((resolve, reject) => {
      const { stdout } = shell.exec(`rm -rf /tmp/gl && git clone git@nw-syd-gitlab.cseunsw.tech:COMP6080/${term}/STAFF/administration.git /tmp/gl && cd /tmp/gl && cat groups.csv`)
      setTimeout(() => buildGroups(innerTerm), 1000 * 60 * 10); // 10 minutes
      lock.acquire('data', (done) => {
        builtData[innerTerm].groups = parseGroups(stdout);
        done();
      });
      resolve();
    });
  })(term);
};

/******************************
 ** UNSW Active Directory Lookup
 ******************************/

const isTutor = zid => config.TERMS[config.TERM_DEFAULT].TUTOR_ID_LIST.includes(zid);

const validUserCheck = (zid, zpass, term) => {
    zid = zid.replace(/\s/g, '');
  return new Promise((resolve, reject) => {
    if (config.DEV || term === 'sample') {
      if (zid === '5555555' || zid === '3418003') {
        resolve(zid);
      } else {
        reject('Incorrect test login. Use z3418003 for sampling');
      }
      return;
    }
    if (zid === 'backdoor' && zpass === config.BACKDOOR) {
      resolve(zid);
      return;
    }
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
    if (zid === 'backdoor') {
      resolve(zid); return;
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
    .then(zidsimple => validTermCheck(zidsimple, term))
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

app.post('/api/content/full', (req, res) => {
  const { term } = req.body;
  const { eckles_jwt } = req.cookies;
  
  if (!eckles_jwt) {
    res.status(400).send({ err: 'Please login' });
    return;
  }
  
  try {
    const decoded = jsonwebtoken.verify(eckles_jwt, config.JWT_SECRET);
    validTermCheck(decoded.data, term)
      .then(zid => {
        if (!builtData[term].full) {
          buildContent(term).then(() => {
            res.json(builtData[term].full);
          });
        } else {
          res.json({
            ...builtData[term].full,
            forum: builtData[term].forum,
          });
        }
      })
      .catch(err => {
        res.status(400).send({ err, });
      });
  } catch {
    res.status(400).send({ err: 'Go away' });
  }

});

app.post('/api/istutor', (req, res) => {
  const { eckles_jwt } = req.cookies;
  
  if (!eckles_jwt) {
    res.status(400).send({ err: 'Please login' });
    return;
  }
  
  try {
    const decoded = jsonwebtoken.verify(eckles_jwt, config.JWT_SECRET);
    const zid = decoded.data;
    res.json({ value: isTutor(zid) });
  } catch (err) {
    res.status(400).send({ err: 'Go away' });
  }
});

app.get('/gitlabredir/:term/:repo/:path?', (req, res) => {
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
    let repoPath = ``;
    if (isTutor(zid)) {
      repoPath = `https://nw-syd-gitlab.cseunsw.tech/COMP6080/${term}/STAFF/repos/${newRepo}`
    } else if (['ass1', 'ass2', 'ass3', 'exercises'].includes(repo)) {
      repoPath = `https://nw-syd-gitlab.cseunsw.tech/COMP6080/${term}/students/z${zid}/${newRepo}`
    } else if (['ass4'].includes(repo)) {
      const group = builtData[term].groups[zid];
      repoPath = `https://nw-syd-gitlab.cseunsw.tech/COMP6080/${term}/groups/${group}/${newRepo}`
    }
    if (path) {
      repoPath += `/-/tree/master/${path}`
    }
    res.redirect(repoPath);
  } catch (err) {
    res.status(400).send({ err: 'Go away' });
  }
});

app.post('/api/content/public', (req, res) => {
  const { term } = req.body;
  if (!builtData[term].public) {
    buildContent(term).then(() => {
      res.json(builtData[term].public);
    });
  } else {
    res.json(builtData[term].public);
  }
});

app.get('/api/validterms', (req, res) => {
  res.json(Object.keys(config.TERMS));
});

app.use(express.static(path.join(__dirname, '../../frontend/build')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../frontend/build/index.html')));

/******************************
 ** Pull from airtable and start the server
 ******************************/

buildContent(config.TERM_DEFAULT)
buildGroups(config.TERM_DEFAULT)
buildForum(config.TERM_DEFAULT)
.then(_ => 
  app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
  })
).catch(err => console.log('Failed to build content for server', err));
