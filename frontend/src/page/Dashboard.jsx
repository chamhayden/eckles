import { useNavigate, Link } from 'react-router-dom';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';

import SubNav from '../component/SubNav';
import makePage from '../component/makePage';
import { Context, useContext } from '../context';
import { getPrimaryNavList } from '../component/NavList';
import SessionAlert from '../component/SessionAlert';
import { getCurrentWeek, isHappeningNow } from '../util/date';
import HappeningNow from '../component/HappeningNow';
import truncate from 'html-truncate';

const Dashboard = ({}) => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  if (getters.content) {
    const { schedule_lectures, schedule_help_sessions, schedule_tutorials, meta } = getters.content;

    const currentWeek = getCurrentWeek(meta[0].value);
    const weeklyLectures = schedule_lectures.filter(
      (schedule_lectures) => schedule_lectures.week().week === currentWeek
    );

    const weeklyHelpSessions = schedule_help_sessions.filter(
      (schedule_help_sessions) => schedule_help_sessions.weeks().week === currentWeek
    );

    const ongoingLectures = weeklyLectures.filter(isHappeningNow);
    const ongoingHelpSessions = weeklyHelpSessions.filter(isHappeningNow);
    const ongoingTutorials = schedule_tutorials.filter(isHappeningNow);

    return (
      <>
        <Box
          sx={{
            maxWidth: '1200px',
            padding: '0 20px',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              mt: 0,
              lineHeight: 1.3,
              backgroundClip: 'text',
              fontSize: '1.7em',
              color: '#333 !important',
            }}
          >
            Welcome to COMP6080 for {getters.term}
          </Typography>
          {cookies.eckles_loggedin && getters.content ? (
            <>
              {(ongoingLectures.length > 0 ||
                ongoingHelpSessions.length > 0 ||
                ongoingTutorials.length > 0) && (
                <>
                  <HappeningNow
                    ongoingLectures={ongoingLectures}
                    ongoingHelpSessions={ongoingHelpSessions}
                    ongoingTutorials={ongoingTutorials}
                  />
                </>
              )}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                  lineHeight: 1.4,
                  fontSize: '1.3em',
                  color: 'text.primary',
                }}
              >
                📢 Recent Notices
              </Typography>
              {getters.content.forum &&
                getters.content.forum.map((post, idx) => (
                  <Card
                    elevation={0}
                    sx={{
                      padding: '20px',
                      margin: '16px 0',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '12px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                        borderColor: 'primary.main',
                      },
                    }}
                    key={idx}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        margin: 0,
                        padding: 0,
                        fontWeight: 600,
                        mb: 1.5,
                        lineHeight: 1.4,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                      }}
                    >
                      Posted {post.created_at}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: '20px',
                        fontSize: '1rem',
                        lineHeight: '1.75',
                        color: 'text.secondary',
                        '& p': {
                          marginBottom: '1em',
                        },
                        '& ul, & ol': {
                          marginBottom: '1em',
                          paddingLeft: '1.5em',
                        },
                        '& li': {
                          marginBottom: '0.5em',
                        },
                        '& h1': {
                          fontSize: '1.5em',
                        },
                        '& h2': {
                          fontSize: '1.2em',
                        },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: post.document,
                      }}
                    />
                    <Button
                      variant="outlined"
                      href={post.url}
                      target="_blank"
                      sx={{
                        mt: 3,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '10px 20px',
                      }}
                    >
                      Read Full Notice →
                    </Button>
                  </Card>
                ))}
            </>
          ) : (
            <Box
              sx={{
                mt: 4,
                p: 4,
                backgroundColor: 'primary.light',
                color: 'white',
                borderRadius: '12px',
                display: 'inline-block',
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Please{' '}
              <Link
                to="/login"
                style={{
                  color: 'white',
                  fontWeight: 700,
                  textDecoration: 'underline',
                }}
              >
                log in
              </Link>{' '}
              to view content
            </Box>
          )}
        </Box>
      </>
    );
  } else {
    return <>Loading</>;
  }
};

export default makePage(Dashboard, {
  loginRequired: false,
  title: '💪🏻 Dashboard',
});
