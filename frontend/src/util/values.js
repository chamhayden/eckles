export const tutorialUrl = (istutor, term, key) => istutor
    ? `https://gitlab.cse.unsw.edu.au/COMP6080/${term}/STAFF/repos/exercises/-/tree/master/${key}`
    : `/redirect/?path=COMP6080/${term}/students/_/exercises/-/tree/master/${key}`;