import * as React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

function LiveSession({ title, sessions, getDetails }) {
  if (sessions.length === 0) return null;

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        🔴 {title} Happening NOW!
      </Typography>
      {sessions.map((session, index) => {
        const { time, location, callUrl, className } = getDetails(session);

        const content = (
          <>
            <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.8 }}>
              <strong>Time:</strong> {time} {location && `| `}
              {location && <strong>Location:</strong>} {location}
              {className && ` | `}
              {className && <strong>Class:</strong>} {className}
            </Typography>
            {callUrl && (
              <Button
                variant="contained"
                href={callUrl.includes('http') ? callUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: '100%',
                  marginTop: '12px',
                  backgroundColor: '#059669',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  padding: '10px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                  '&:hover': {
                    backgroundColor: '#047857',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px -2px rgb(0 0 0 / 0.3)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {callUrl.includes('http') ? '🎥 Join Online Session' : callUrl}
              </Button>
            )}
          </>
        );

        return sessions.length > 1 ? (
          <Card
            key={index}
            sx={{
              marginBottom: '15px',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.2)',
            }}
          >
            <CardContent>{content}</CardContent>
          </Card>
        ) : (
          <Box
            key={index}
            sx={{
              marginBottom: '12px',
              padding: '16px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {content}
          </Box>
        );
      })}
    </>
  );
}

export default function HappeningNow({ ongoingLectures, ongoingHelpSessions, ongoingTutorials }) {
  const hasLiveSessions =
    ongoingLectures.length > 0 || ongoingHelpSessions.length > 0 || ongoingTutorials.length > 0;

  if (!hasLiveSessions) return null;

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '16px',
        padding: '20px',
        margin: '16px 0',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
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
          const timeWithoutClass = tutorial.times.replace(/\(.*?\)$/, '').trim();

          return {
            time: timeWithoutClass,
            callUrl: tutorial.call_url_h,
            className: match ? match[1] : 'Unknown',
          };
        }}
      />
    </Box>
  );
}
