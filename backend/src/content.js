const Airtable = require('airtable');

const config = require('./config');


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
      for (const recordkey of Object.keys(objPartial[key])) {
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

module.exports = {
  generateContent,
};