export const tutorialUrl = (istutor, term, key) =>
	istutor
		? `https://nw-syd-gitlab.cseunsw.tech/COMP6080/${term}/STAFF/repos/exercises/-/tree/master/${key}`
		: `/~cs6080/redirect/?path=COMP6080/${term}/students/_/exercises/-/tree/master/${key}`;
