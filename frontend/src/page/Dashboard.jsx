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
import { getLiveLectures, getLiveHelpSessions } from '../util/live';

const Dashboard = ({ }) => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [liveItems, setLiveItems] = React.useState([]);

  React.useEffect(() => {
    setLiveItems(
      [
        ...getLiveLectures(getters.content.schedule_lectures),
        ...getLiveHelpSessions(getters.content.schedule_help_sessions),
      ],
    );
  }, [getters.content]);

  return (
    <>
      <div style={{lineHeight: '150%', fontSize: '1.5em'}}>
      <h3>Welcome to COMP6080 for {getters.term}.</h3>
      {cookies.eckles_loggedin ? (
        <>
          <h4>Notices</h4>
          {getters.content.forum && (
            <>
              {getters.content.forum.length > 0 ? (
                <>
                  {getters.content.forum.map((post, idx) => (
                    <Card variant="outlined" sx={{ padding: '20px', margin: '20px 0' }}>
                      <h3 style={{ margin: 0, padding: 0}}>{post.title}</h3>
                      <span style={{ fontSize: '0.6em' }}>Posted {post.created_at}</span>
                      <div style={{ marginTop: '20px', fontSize: '0.8em', lineHeight: '110%' }} dangerouslySetInnerHTML={{ __html: post.document.replaceAll('\n', '<br />').substring(0, 300) + `......`}}></div><br />
                      <a target="_blank" href={post.url}>READ FULL NOTICE</a>
                    </Card>
                  ))}
                </>
              ) : (
                <small>No notices right now.</small>
              )}
            </>
          )}
          <h4>Live Lectures & Help Sessions</h4>
          {liveItems.length > 0 ? (
            <>
             {liveItems.map((item, idx) => (
                <a href={item.call_url} target="_blank">
                  <Card variant="outlined" sx={{ padding: '20px', margin: '20px 0' }}>
                    <h3 style={{ margin: 0, padding: 0}}>{item.name}</h3>
                    <p>{item.description}</p>
                  </Card>
                </a>
              ))}
            </>
          ) : (
            <small>No lectures or help sessions are live right now.</small>
          )}
        </>
      ) : (
        <>
          Please <Link to="/login">log in</Link>
        </>
      )}

      </div>
    </>
  );
}

export default makePage(Dashboard, {
  loginRequired: false,
  title: '💪🏻 Dashboard',
});