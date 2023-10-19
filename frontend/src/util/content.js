import { apiCall } from "./api";

import { DEV, joinSchema } from "../config";

/* Genius or madness */
const joinContent = (content) => {
	const newContent = {};
	for (const table in content) {
		newContent[table] = [];
		for (const recordKey in content[table]) {
			newContent[table].push(content[table][recordKey]);
		}
		for (const row of newContent[table]) {
			for (const cellKey in row) {
				const joinInfo = joinSchema[table]["joins"][cellKey];
				if (joinInfo) {
					const [otherTable, atomic] = joinInfo;
					row[cellKey] = ((thisCell, otherTable, atomic) => {
						return () => {
							if (atomic) {
								return content[otherTable][thisCell[0]];
							} else {
								return thisCell.map((cell) => content[otherTable][cell]);
							}
						};
					})(row[cellKey], otherTable, atomic);
				}
			}
		}
	}
	newContent.weeks = newContent.weeks.sort((a, b) =>
		parseInt(a.week) > parseInt(b.week)
			? 1
			: parseInt(b.week) > parseInt(a.week)
			? -1
			: 0,
	);
	return newContent;
};

export const loadContent = (term, loggedIn = false) => {
	return new Promise((resolve, reject) => {
		// Check if we stored it locally
		const expiry = localStorage.getItem("eckles_expiry");
		if (expiry) {
			if (new Date().getTime() < JSON.parse(expiry)) {
				const storedTerm = localStorage.getItem("eckles_term");
				if (storedTerm === term) {
					const eckles_content = localStorage.getItem("eckles_content");
					if (eckles_content) {
						const content = JSON.parse(eckles_content);
						resolve(joinContent(content));
						return;
					}
				}
			}
		}
		apiCall("content/" + (loggedIn ? "full" : "public"), {
			term,
		})
			.then((rawContent) => {
				const expiry = new Date().getTime() + 1000 * 60 * 5;
				if (!DEV) {
					localStorage.setItem("eckles_expiry", expiry);
					localStorage.setItem("eckles_term", term);
					localStorage.setItem("eckles_content", JSON.stringify(rawContent));
				}
				const content = joinContent(rawContent);
				resolve(content);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};

export const getYoutubeCodeFromUrl = (code) => code.slice(code.length - 11);

export const RELEVANCE = {
	mandatory: {
		colour: "rgb(200,255,200)",
		alert: "We require that you watch this lecture.",
		select: "I want to do the bare minimum",
	},
	catchup: {
		colour: "rgb(200,200,255)",
		alert:
			"These are COMP1531 lectures for postgrads who want to catch up on some core assumed content.",
	},
	recommended: {
		colour: "rgb(255,200,255)",
		alert:
			"You will survive without watching this, but we recommend that a typical student should watch.",
		select: "I want to work hard but not go over the top",
	},
	extension: {
		colour: "rgb(255,200,200)",
		alert:
			"You will be completely fine without watching this - no issues at all! This is just for the keen beans with spare time or a lot curiosity",
		select: "I want to learn everything",
	},
};
