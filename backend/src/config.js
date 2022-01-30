const fs = require('fs');
const path = require('path');

const config = {
  DEV: true,
  JWT_SECRET: 'TESTING2',
  PORT: 6080,
  COOKIE_EXPIRY: 60 * 60 * 24 * 7,
  AIRTABLE_API_KEY: 'keyOJnoA6KHnByQUv',
  TERMS: {
    sample: {
      STUDENT_LIST_SH: 'echo "5555555\n3418003"',
      AIRTABLE_BASE: 'appqP1rmpJiAf1wMp',
      TUTOR_ID_LIST: [],
      AUDIT_ID_LIST: []
    },
  },
  TERM_DEFAULT: 'sample',
  BACKDOOR: "12345",
};

const filepath = path.resolve(__dirname, './env.json');

try {
  if (fs.existsSync(filepath)) {
    const data = JSON.parse(fs.readFileSync(filepath, {encoding:'utf8', flag:'r'}));
    for (key in data) {
      config[key] = data[key];
    }
  }
} catch(err) {}
module.exports = config;
