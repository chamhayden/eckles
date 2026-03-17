const Airtable = require('airtable');
const fs = require('fs');
const path = require('path');

const config = require('./config');

// ??? from frontend???
const { joinSchema } = require('../../frontend/src/config');

const tables = Object.keys(joinSchema);

const RATINGS_FILE = path.join(__dirname, '../data/lecture_ratings.json');
const RATINGS_BACKUP_DIR = path.join(__dirname, '../data/ratings_backups');

// Ensure data directories exist
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
}
if (!fs.existsSync(RATINGS_BACKUP_DIR)) {
  fs.mkdirSync(RATINGS_BACKUP_DIR, { recursive: true });
}

// Initialize ratings file if it doesn't exist
if (!fs.existsSync(RATINGS_FILE)) {
  fs.writeFileSync(RATINGS_FILE, JSON.stringify({}), 'utf8');
}

// Load ratings into memory
let ratingsCache = JSON.parse(fs.readFileSync(RATINGS_FILE, 'utf8'));

// Helper to persist ratings to disk
const saveRatings = () => {
  fs.writeFileSync(RATINGS_FILE, JSON.stringify(ratingsCache, null, 2), 'utf8');
};

// Backup ratings daily
const backupRatings = () => {
  const timestamp = new Date().toISOString().split('T')[0];
  const backupFile = path.join(RATINGS_BACKUP_DIR, `ratings_${timestamp}.json`);
  if (!fs.existsSync(backupFile)) {
    fs.copyFileSync(RATINGS_FILE, backupFile);
    console.log(`Ratings backed up to ${backupFile}`);
  }
};

// Run backup daily (every 24 hours)
setInterval(backupRatings, 24 * 60 * 60 * 1000);
// Also backup immediately on startup
backupRatings();

const generateContent = async (term) => {
  const basename = config.TERMS[term].AIRTABLE_BASE;
  const base = new Airtable({ apiKey: config.TERMS[term].AIRTABLE_API_KEY }).base(basename);

  const obj = {};
  await Promise.all(tables.map(table => {
    obj[table] = {};
    return new Promise((resolve, reject) => {
      base(table)
        .select({ maxRecords: 1000, view: 'API' })
        .all()
        .then(records => {
          records.forEach(record => {
            obj[table][record.id] = {};
            Object.keys(record.fields).forEach(field => {
              obj[table][record.id][field] = record.get(field);
            });
          });
          resolve();
        });
    });
  }));

  const objPartial = {};
  Object.keys(joinSchema).forEach(key => {
    if (joinSchema[key].public) {
      objPartial[key] = JSON.parse(JSON.stringify(obj[key])); // I hate this method
      for (const recordkey of Object.keys(objPartial[key])) { // ughhhhhhh
        for (const cellkey of Object.keys(objPartial[key][recordkey])) {
          if (cellkey.endsWith('_h')) {
            objPartial[key][recordkey][cellkey] = '';
          }
        }
      }
    }
  });

 
  return {
    full: obj,
    public: objPartial,
  };
};

const updateRating = async (term, zid, slug, rating, comment) => {
  try {
    const key = `${term}:${zid}:${slug}`;
    ratingsCache[key] = {
      term,
      zid,
      slug,
      rating,
      comment,
      updated_at: new Date().toISOString(),
    };
    saveRatings();
  } catch (err) {
    console.error("Error updating/creating rating:", err);
  }
}

const getRating = async (term, zid, slug) => {
  try {
    const key = `${term}:${zid}:${slug}`;
    const data = ratingsCache[key];
    if (data) {
      return {
        rating: data.rating,
        comment: data.comment,
      };
    }
    return null;
  } catch (err) {
    console.error("Error getting rating:", err);
    return null;
  }
}

module.exports = {
  generateContent,
  updateRating,
  getRating,
};