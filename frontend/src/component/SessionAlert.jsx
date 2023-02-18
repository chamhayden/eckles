import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import HelpIcon from "@mui/icons-material/Help";
import SchoolIcon from "@mui/icons-material/School";
import { keyframes } from "@mui/system";
import { Context, useContext } from "../context";

const start_of_term = new Date("February 13, 2023 00:00:00");
const today = new Date('February 14, 2023 15:00:01');
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let tutor = "";

const calculateCurrentWeek = () => {
  const ms_between_dates = Math.abs(start_of_term.getTime() - today.getTime());
  const curr_week = Math.ceil(ms_between_dates / (24 * 60 * 60 * 1000 * 7));
  if (curr_week > 0 && curr_week <= 10) {
    return curr_week;
  }
  return 0;
};

const calculateHour = (timeslot) => {
  const curr_time = new Date(today.getTime());
  let hour = Number(timeslot.replace("pm", "").replace("am", ""));
  if (timeslot.includes("pm") && hour !== 12) {
    hour += 12;
  }
  return curr_time.setHours(hour, 0, 0);
};

const calculateSessions = (schedule_array) => {
  const curr_week = calculateCurrentWeek();
  if (curr_week === 0) return [];
  let sessions = schedule_array.filter((session) => 
    weekday[today.getDay()] === session.day
  );
  if (sessions.length > 0 && sessions[0].week === 'function') {
    sessions = sessions.filter((session) =>
      session.week().week === curr_week
    );
  }
  return sessions;
}

const checkCurrentSession = (sessions) => {
  for (let session of sessions) {
    let timeslot = ""
    if (session.time) {
      timeslot = session.time.split("-");
    } else {
      timeslot = session.times.split("-");
    }
    const start = calculateHour(timeslot[0]);
    const end = calculateHour(timeslot[1]);
    if (today.getTime() > start && today.getTime() < end) {
      return session;
    }
  }
  return {};
}

const checkLectureURL = (schedule_array) => {
  const sessions = calculateSessions(schedule_array);
  if (sessions.length > 0) {
    const session = checkCurrentSession(sessions);
    return session.call_url_h;
  }
  return "";
};

const checkTutorialURL = (schedule_array) => {
  const sessions = calculateSessions(schedule_array);
  if (sessions.length > 0) {
    const session = checkCurrentSession(sessions);
    if (session.call_url_h && session.call_url_h.includes("http")) {
      tutor = session.staff ? session.staff().map((s) => s.name).join(", ") : "";
      return session.call_url_h;
    }
  }
  return "";
};

const checkHelpSessionURL = (schedule_array) => {
  for (let session of schedule_array) {
    if (calculateCurrentWeek() === session.week) {
      for (let helpSession of session.schedule_help_sessions()) {
        const timeslot = helpSession.times.split("-");
        const start = calculateHour(timeslot[0]);
        const end = calculateHour(timeslot[1]);
        if (
          weekday[today.getDay()] === helpSession.day &&
          today.getTime() > start &&
          today.getTime() < end
        ) {
          return helpSession.call_url_h;
        }
      }
    }
  }
  return "";
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
      title: "Lecture",
      icon: SchoolIcon,
      backgroundColor: "warning.main",
      shadow: "orange",
      URL: checkLectureURL(getters.content.schedule_lectures),
    },
    {
      title: "Tutorial",
      icon: CastForEducationIcon,
      backgroundColor: "error.main",
      shadow: "red",
      URL: checkTutorialURL(getters.content.schedule_tutorials),
    },
    {
      title: "Help Session",
      icon: HelpIcon,
      backgroundColor: "info.main",
      shadow: "blue",
      URL: checkHelpSessionURL(getters.content.weeks),
    },
  ];
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "25px", marginBottom: "25px" }}
    >
      {SessionCards.map((card) => {
        return (
          <>
            {card.URL && getters.loggedIn && (
              <Card
                key={card.title}
                onClick={() => props.redirect(card.URL)}
                sx={{ backgroundColor: card.backgroundColor, color: "white", minWidth: 275, flex: 1, height: 150, cursor: "pointer", animation: `${glow} 1s infinite alternate ease`, boxShadow: `0 0 5px 5px ${card.shadow}` }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    <card.icon style={{ paddingTop: "5px" }} /> {card.title}
                  </Typography>
                  {card.title === "Tutorial" && (
                    <Typography variant="body">Tutor: {tutor}</Typography>
                  )}
                  <Typography variant="body2">
                    A {card.title.toLowerCase()} is currently live! Click on the
                    card to redirect yourself to the session.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </>
        );
      })}
    </div>
  );
};

export default SessionAlert;
