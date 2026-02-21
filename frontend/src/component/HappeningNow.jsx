import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';

function LiveSession({ title, sessions, getDetails, isLast }) {
  if (sessions.length === 0) return null;

  return (
    <Box
      sx={{
        paddingBottom: isLast ? 0 : '16px',
        marginBottom: isLast ? 0 : '16px',
        borderBottom: isLast ? 'none' : '1px solid rgba(59, 130, 246, 0.2)',
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        🔴 {title} Happening NOW!
      </Typography>
      {sessions.map((session, index) => {
        const { time, location, callUrl, className } = getDetails(session);

        return (
          <Box
            key={index}
            sx={{
              marginBottom: index < sessions.length - 1 ? '12px' : 0,
            }}
          >
            <Typography variant="body1" sx={{ color: '#374151', lineHeight: 1.8 }}>
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
                  marginTop: '10px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  padding: '10px 20px',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    backgroundColor: '#2563eb',
                    boxShadow: '0 4px 8px rgba(59, 130, 246, 0.4)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {callUrl.includes('http') ? '🎥 Join Online Session' : callUrl}
              </Button>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default function HappeningNow({ ongoingLectures, ongoingHelpSessions, ongoingTutorials }) {
  const hasLiveSessions =
    ongoingLectures.length > 0 || ongoingHelpSessions.length > 0 || ongoingTutorials.length > 0;

  if (!hasLiveSessions) return null;

  const sections = [
    { key: 'lectures', data: ongoingLectures },
    { key: 'helpSessions', data: ongoingHelpSessions },
    { key: 'tutorials', data: ongoingTutorials },
  ];
  const lastNonEmptyIndex = sections.map(s => s.data.length > 0).lastIndexOf(true);

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '12px',
        padding: '24px',
        margin: '16px 0',
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
      }}
    >
      <LiveSession
        title="Lecture"
        sessions={ongoingLectures}
        isLast={lastNonEmptyIndex === 0}
        getDetails={(lecture) => ({
          time: lecture.time,
          location: lecture.location,
          callUrl: lecture.call_url_h,
        })}
      />
      <LiveSession
        title="Help Session"
        sessions={ongoingHelpSessions}
        isLast={lastNonEmptyIndex === 1}
        getDetails={(session) => ({
          time: session.times,
          callUrl: session.call_url_h,
        })}
      />
      <LiveSession
        title="Tutorial"
        sessions={ongoingTutorials}
        isLast={lastNonEmptyIndex === 2}
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