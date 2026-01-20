const Airtable = require('airtable');

const config = require('./config');

// ??? from frontend???
const { joinSchema } = require('../../frontend/src/config');

const tables = Object.keys(joinSchema);

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
  const basename = config.TERMS[term].AIRTABLE_BASE;
  const base = new Airtable({ apiKey: config.TERMS[term].AIRTABLE_API_KEY }).base(basename);
  try {
    const existingRecords = await base('lectures_vote')
      .select({
        filterByFormula: `AND({zid} = '${zid}', {lecture_slug} = '${slug}')`
      })
      .firstPage();

    if (existingRecords.length > 0) {
      // Update existing record
      await base('lectures_vote').update([
        {
          "id": existingRecords[0].id,
          "fields": {
            "rating": rating,
            "comment": comment,
          }
        }
      ]);
    } else {
      // Create a new record
      await base('lectures_vote').create([
        {
          "fields": {
            "zid": zid,
            "lecture_slug": slug,
            "rating": rating,
            "comment": comment,
          }
        }
      ]);
    }
  } catch (err) {
    console.error("Error updating/creating rating:", err);
  }
}

const getRating = async (term, zid, slug) => {
  const basename = config.TERMS[term].AIRTABLE_BASE;
  const base = new Airtable({ apiKey: config.TERMS[term].AIRTABLE_API_KEY }).base(basename);
  try {
    const records = await base('lectures_vote')
      .select({
        filterByFormula: `AND({zid} = '${zid}', {lecture_slug} = '${slug}')`
      })
      .firstPage();

    if (records.length > 0) {
      const rating = records[0].fields.rating;
      const comment = records[0].fields.comment;
      return {
        rating,
        comment,
      }
    } else {
      return null;
    }
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