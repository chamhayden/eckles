import * as React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

function LiveSession({ title, sessions, getDetails }) {
  if (sessions.length === 0) return null;

  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title} Happening NOW!
      </Typography>
      {sessions.map((session, index) => {
        const { time, location, callUrl, className } = getDetails(session);

        const content = (
          <>
            <Typography variant="body1">
              <strong>Time:</strong> {time} {location && `| `}
              {location && <strong>Location:</strong>} {location}
              {className && ` | `}
              {className && <strong>Class:</strong>} {className}
            </Typography>
            {callUrl && (
              <Button
                variant="contained"
                href={callUrl.includes("http") ? callUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                disableElevation
                sx={{
                  width: "100%",
                  marginTop: "5px",
                  backgroundColor: "#2f7d31",
                  color: "white",
                  border: "3px solid white",
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                    color: "white",
                  },
                }}
              >
                {callUrl.includes("http") ? "Join Online Session" : callUrl}
              </Button>
            )}
          </>
        );

        return sessions.length > 1 ? (
          <Card
            key={index}
            sx={{
              marginBottom: "15px",
              backgroundColor: "#4daf50",
              border: "1px solid white",
            }}
          >
            <CardContent>{content}</CardContent>
          </Card>
        ) : (
          <Box
            key={index}
            sx={{ marginBottom: "10px", backgroundColor: "#4daf50" }}
          >
            {content}
          </Box>
        );
      })}
    </>
  );
}

export default function HappeningNow({
  ongoingLectures,
  ongoingHelpSessions,
  ongoingTutorials,
}) {
  const hasLiveSessions =
    ongoingLectures.length > 0 ||
    ongoingHelpSessions.length > 0 ||
    ongoingTutorials.length > 0;

  if (!hasLiveSessions) return null;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        padding: "20px",
        margin: "20px 0",
        backgroundColor: "#4daf50",
      }}
    >
      <LiveSession
        title="Lecture"
        sessions={ongoingLectures}
        getDetails={(lecture) => ({
          time: lecture.time,
          location: lecture.location,
          callUrl: lecture.call_url_h,
        })}
      />
      <LiveSession
        title="Help Session"
        sessions={ongoingHelpSessions}
        getDetails={(session) => ({
          time: session.times,
          callUrl: session.call_url_h,
        })}
      />
      <LiveSession
        title="Tutorial"
        sessions={ongoingTutorials}
        getDetails={(tutorial) => {
          const match = tutorial.times.match(/\((.*?)\)$/);
          const timeWithoutClass = tutorial.times
            .replace(/\(.*?\)$/, "")
            .trim();

          return {
            time: timeWithoutClass,
            callUrl: tutorial.call_url_h,
            className: match ? match[1] : "Unknown",
          };
        }}
      />
    </Box>
  );
}
