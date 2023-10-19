const Airtable = require("airtable");

const config = require("./config");

const { joinSchema } = require("../../frontend/src/config");

const tables = Object.keys(joinSchema);

const generateContent = (term) => {
	const basename = config.TERMS[term].AIRTABLE_BASE;
	const base = new Airtable({ apiKey: config.AIRTABLE_API_KEY }).base(basename);
	return new Promise((resolve, reject) => {
		const obj = {};
		Promise.all(
			tables.map((table) => {
				return new Promise((resolve, reject) => {
					obj[table] = {};
					base(table)
						.select({
							maxRecords: 1000,
							view: "API",
						})
						.eachPage(
							(records) => {
								records.forEach((record) => {
									obj[table][record.id] = {};
									Object.keys(record.fields).forEach((field) => {
										obj[table][record.id][field] = record.get(field);
									});
								});
								resolve();
							},
							function done(err) {
								if (err) {
									reject(err);
									return;
								}
							},
						);
				});
			}),
		)
			.then(() => {
				const objPartial = {};
				Object.keys(joinSchema).forEach((key) => {
					if (joinSchema[key].public) {
						objPartial[key] = JSON.parse(JSON.stringify(obj[key])); // I hate this method
						for (const recordkey of Object.keys(objPartial[key])) {
							for (const cellkey of Object.keys(objPartial[key][recordkey])) {
								if (cellkey.endsWith("_h")) {
									objPartial[key][recordkey][cellkey] = "";
								}
							}
						}
					}
				});
				resolve({
					full: obj,
					public: objPartial,
				});
			})
			.catch((err) => {
				console.log("Error building", err);
			});
	});
};

module.exports = {
	generateContent,
};
