let config = {};
config.DEV = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
config.BASE_URL = config.DEV ? 'http://localhost:6080' : 'https://cgi.cse.unsw.edu.au/~cs6080';
config.BASE_NAME = config.DEV ? '/' : '/~cs6080/';

config.terms = config.DEV ? ['sample'] : ['sample', '22T3'];
config.DEFAULT_TERM = config.DEV ? 'sample' : '22T3';

config.joinSchema = {
  content_tutorials: {
    public: false,
    joins: {
      week: ['weeks', true],
      topic: ['topics', true],
      video_author: ['staff', true],
    },
  },
  schedule_lectures: {
    public: true,
    joins: {
      week: ['weeks', true],
      content_lectures: ['content_lectures', false],
    },
  },
  weeks: {
    public: true,
    joins: {
      content_lectures: ['content_lectures', false],
      content_tutorials: ['content_tutorials', false],
      schedule_lectures: ['schedule_lectures', true],
      schedule_help_sessions: ['schedule_help_sessions', false],
    },
  },
  schedule_tutorials: {
    public: true,
    joins: {
      staff: ['staff', false],
    },
  },
  staff: {
    public: true,
    joins: {
      schedule_lectures: ['schedule_lectures', false],
      schedule_tutorials: ['schedule_tutorials', false],
    },
  },
  topics: {
    public: true,
    joins: {
      content_lectures: ['content_lectures', false],
      content_tutorials: ['content_tutorials', false],
      area: ['topic_areas', true],
    },
  },
  topic_areas: {
    public: true,
  	joins: {
  	  topics: ['topics', false],
  	},
  },
  content_lectures: {
    public: false,
    joins: {
      topic: ['topics', true],
      week: ['weeks', true],
      lectures_prereq: ['content_lectures', false],
      content_tutorials: ['content_tutorials', false],
      schedule_lectures: ['schedule_lectures', false],
      staff: ['staff', false],
    },
  },
  schedule_help_sessions: {
    public: true,
  	joins: {
  	  weeks: ['weeks', true],
  	  staff: ['staff', false],
  	}
  }
};

module.exports = config;