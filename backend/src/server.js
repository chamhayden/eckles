const config = require('./config');

const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const ActiveDirectory = require('activedirectory2').promiseWrapper;
const cors = require('cors');
const path = require('path');

const { generateContent } = require('./content');
const { getStudentIds, getGrades } = require('./student_data');

/******************************
 ** Load content
 ******************************/

let builtContent = {};
Object.keys(config.TERMS).map(term => builtContent[term] = { public: null, full: null });

const buildContent = (term) => {
  return ((innerTerm) => {
    return new Promise((resolve, reject) => {
      generateContent(innerTerm).then(({ full, public }) => {
        builtContent[innerTerm].full = full;
        builtContent[innerTerm].public = public;
        setTimeout(() => buildContent(innerTerm), 1000 * 60 * 60); // 1 hour
        resolve();
      }).catch(reject);
    });
  })(term);
};

/******************************
 ** UNSW Active Directory Lookup
 ******************************/

const validUserCheck = (zid, zpass, term) => {
  return new Promise((resolve, reject) => {
    if (config.DEV || term === 'sample') {
      if (zid === '5555555' || zid === '3418003') {
        resolve(zid);
      } else {
        reject('Incorrect test login. Use z5555555 for sampling');
      }
      return;
    }
    if (zid === 'backdoor' && zpass === config.BACKDOOR) {
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
    getStudentIds(config.DEV ? 'sample' : term)
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
  origin : config.DEV ? "http://localhost:3000" : 'https://cs6080.web.cse.unsw.edu.au',
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
        if (!builtContent[term].full) {
          buildContent(term).then(() => {
            res.json(builtContent[term].full);
          });
        } else {
          res.json(builtContent[term].full);
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
    res.json({ value: config.TERMS[config.TERM_DEFAULT].TUTOR_ID_LIST.includes(zid)});
  } catch (err) {
    res.status(400).send({ err: 'Go away' });
  }

});

app.post('/api/content/public', (req, res) => {
  const { term } = req.body;
  if (!builtContent[term].public) {
    buildContent(term).then(() => {
      res.json(builtContent[term].public);
    });
  } else {
    res.json(builtContent[term].public);
  }
});


app.post('/api/grades', (req, res) => {
  const { term } = req.body;
  const { eckles_jwt } = req.cookies;
  
  if (!eckles_jwt) {
    res.status(400).send({ err: 'Please login' });
    return;
  }
  
  try {
    const decoded = jsonwebtoken.verify(eckles_jwt, config.JWT_SECRET);
    res.json(getGrades(term, decoded.zid));
  } catch {
    res.status(400).send({ err: 'Go away' });
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

buildContent(config.TERM_DEFAULT).then(_ => 
  app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
  })
).catch(err => console.log('Failed to build content for server', err));
