const fs = require('fs');
const path = require('path');

const config = {
  DEV: true,
  JWT_SECRET: 'TESTING2',
  PORT: 6080,
  COOKIE_EXPIRY: 60 * 60 * 24 * 7,
  TERMS: {
    sample: {
      STUDENT_LIST_SH: 'echo "5555555\n3418003"',
      AIRTABLE_BASE: 'app7CNZud3QDy1IP5',
      AIRTABLE_API_KEY: 'patMWMSzpWIIw4ygQ.8905a12dae8ee6ecd484ea4dc3f1f2961f587b9c87a4682407063345298bd802',
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
} catch(err) { console.log(err); }

module.exports = config;
