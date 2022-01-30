const config = require('./config');
const { exec } = require('child_process');

const getStudentIds = (term) => {
  const command = config.TERMS[term].STUDENT_LIST_SH;
  return new Promise((resolve, reject) => {
    exec(`ssh cs6080@cse.unsw.edu.au "${command}"`, (error, stdout, stderr) => {
      if (error) {
          console.log(`Error loading student list, error: ${error.message}`);
          resolve([]);
          return;
      } else if (stderr) {
          console.log(`Error loading student list, stderr: ${stderr}`);
          resolve([]);
          return;
      } else {
        const zids = stdout.trim().split('\n');
        resolve([...zids, ...config.TERMS[term].TUTOR_ID_LIST, ...config.TERMS[term].AUDIT_ID_LIST]);
        return;
      }
    });
  });
}

const getGrades = (term, zid) => {
  if (term === 'sample') {
    return {
      'ass1': { mark: 1, outof: 15 },
      'ass2': { mark: 2, outof: 30 },
      'ass3': { mark: 3, outof: 35 },
      'exam': { outof: 20 },
    }
  } else {
    return {
      'ass1': { outof: 15 },
      'ass2': { outof: 30 },
      'ass3': { outof: 35 },
      'exam': { outof: 20 },
    }
  }
  
}

module.exports = {
  getStudentIds,
  getGrades,
};
