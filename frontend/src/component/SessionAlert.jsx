import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import HelpIcon from '@mui/icons-material/Help';
import SchoolIcon from '@mui/icons-material/School';
import { keyframes } from '@mui/system';
import { Context, useContext } from '../context';
import { utcToZonedTime } from 'date-fns-tz';

// First day of the term to determine weeks. May need to be changed per term
const start_of_term = new Date('September 11, 2023 00:00:00');
const today = utcToZonedTime(new Date(), 'Australia/Sydney');
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let tutor = [];

/**
 * Function to calculate the current week from the today date object
 * @returns curr_week {Number} - the current week based on today
 */
const calculateCurrentWeek = () => {
  const ms_between_dates = Math.abs(start_of_term.getTime() - today.getTime());
  const curr_week = Math.ceil(ms_between_dates / (24 * 60 * 60 * 1000 * 7));
  if (curr_week > 0 && curr_week <= 10) {
    return curr_week;
  }
  return 0;
};

/**
 * Function to convert a string to a date object
 * @params timeslot {String} - String denoting time in "am" or "pm"
 * @returns curr_time {Date} - the translated date object from a given string
 */
const calculateHour = (timeslot) => {
  const curr_time = new Date(today.getTime());
  let hour = Number(timeslot.replace('pm', '').replace('am', ''));
  if (timeslot.includes('pm') && hour !== 12) {
    hour += 12;
  }
  return curr_time.setHours(hour, 0, 0);
};

/**
 * Function to determine which sessions are valid with the current date
 * @params schedule_array {Array<Object>} - Array of sessions grabbed from the database
 * @returns sessions {Array<Object>} - Array of sessions that have been filtered based off
 *                                     the current week and day
 */
const calculateSessions = (schedule_array) => {
  const curr_week = calculateCurrentWeek();
  if (curr_week === 0) return [];
  let sessions = schedule_array.filter((session) => weekday[today.getDay()] === session.day);
  if (sessions.length > 0 && typeof sessions[0].week === 'function') {
    sessions = sessions.filter((session) => session.week().week === curr_week);
  }
  return sessions;
};

/**
 * Function to check whether current time is within the current session
 * @params session {Object} - A session that needs to be checked
 * @returns session {Object | Number} - A valid session if found, otherwise return 0
 */
const checkCurrentSession = (session) => {
  let timeslot = '';
  if (session.time) {
    timeslot = session.time.split('-');
  } else {
    timeslot = session.times.split('-');
  }
  const start = calculateHour(timeslot[0]);
  // Remove spacing at last time if additional text exists for the tutorial name e.g. "12pm-1pm (T12A)"
  if (timeslot[1].length > 4) {
    timeslot[1] = timeslot[1].split(' ')[0];
  }
  const end = calculateHour(timeslot[1]);
  if (today.getTime() > start && today.getTime() < end) {
    return session;
  }
  return 0;
};

const checkLectureURL = (schedule_array) => {
  const URLs = [];
  const sessions = calculateSessions(schedule_array);
  if (sessions.length > 0) {
    for (let session of sessions) {
      const curr_session = checkCurrentSession(session);
      if (curr_session.call_url_h) {
        URLs.push(curr_session.call_url_h);
      }
    }
  }
  return URLs;
};

const checkTutorialURL = (schedule_array) => {
  // No tutorials during term break
  if (calculateCurrentWeek() === 6) return '';
  const URLs = [];
  const sessions = calculateSessions(schedule_array);
  if (sessions.length > 0) {
    for (let session of sessions) {
      const curr_session = checkCurrentSession(session);
      if (curr_session.call_url_h && curr_session.call_url_h.includes('http')) {
        tutor.push(
          curr_session.staff
            ? curr_session
                .staff()
                .map((s) => s.name)
                .join(', ')
            : ''
        );
        URLs.push(curr_session.call_url_h);
      }
    }
  }
  return URLs;
};

const checkHelpSessionURL = (schedule_array) => {
  const URLs = [];
  const sessions = schedule_array.filter((session) => session.week === calculateCurrentWeek());
  if (sessions.length > 0) {
    for (let session of sessions[0].schedule_help_sessions()) {
      const curr_session = checkCurrentSession(session);
      if (curr_session.call_url_h && weekday[today.getDay()] === curr_session.day) {
        URLs.push(curr_session.call_url_h);
      }
    }
  }
  return URLs;
};

const SessionAlert = (props) => {
  const { getters } = useContext(Context);
  const glow = keyframes`
    from {
      box-shadow: 0 0 0 #fff;
    }
  `;

  const SessionCards = [
    {
      title: 'Lecture',
      icon: SchoolIcon,
      backgroundColor: 'warning.main',
      shadow: 'orange',
      URL: checkLectureURL(getters.content.schedule_lectures),
    },
    {
      title: 'Tutorial',
      icon: CastForEducationIcon,
      backgroundColor: 'error.main',
      shadow: 'red',
      URL: checkTutorialURL(getters.content.schedule_tutorials),
    },
    {
      title: 'Help Session',
      icon: HelpIcon,
      backgroundColor: 'info.main',
      shadow: 'blue',
      URL: checkHelpSessionURL(getters.content.weeks),
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '25px',
        marginBottom: '25px',
      }}
    >
      {SessionCards.map((card) => {
        return (
          <>
            {card.URL.length > 0 &&
              getters.loggedIn &&
              card.URL.map((URL, idx) => {
                return (
                  <Card
                    key={card.title}
                    onClick={() => props.redirect(URL)}
                    sx={{
                      backgroundColor: card.backgroundColor,
                      color: 'white',
                      minWidth: 275,
                      flex: 1,
                      height: 150,
                      cursor: 'pointer',
                      animation: `${glow} 1s infinite alternate ease`,
                      boxShadow: `0 0 5px 5px ${card.shadow}`,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        <card.icon style={{ paddingTop: '5px' }} /> {card.title}
                      </Typography>
                      {card.title === 'Tutorial' && (
                        <Typography variant="body">Tutor: {tutor[idx]}</Typography>
                      )}
                      <Typography variant="body2">
                        A {card.title.toLowerCase()} is currently live! Click on the card to
                        redirect yourself to the session.
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </>
        );
      })}
    </div>
  );
};

export default SessionAlert;
