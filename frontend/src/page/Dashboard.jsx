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

const Dashboard = ({ }) => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  return (
    <>
      <div style={{lineHeight: '150%', fontSize: '1.5em'}}>
      Welcome to COMP6080 for {getters.term}.<br /><br />
      {cookies.eckles_loggedin && getters.content ? (
        <>
          Check out some recent notices!<br />
          {getters.content.forum && getters.content.forum.map((post, idx) => (
            <Card variant="outlined" sx={{ padding: '20px', margin: '20px 0' }}>
              <h3 style={{ margin: 0, padding: 0}}>{post.title}</h3>
              <span style={{ fontSize: '0.6em' }}>Posted {post.created_at}</span>
              <div style={{ marginTop: '20px', fontSize: '0.8em', lineHeight: '110%' }} dangerouslySetInnerHTML={{ __html: post.document.replaceAll('\n', '<br />').substring(0, 300) + `......`}}></div><br />
              <a target="_blank" href={post.url}>READ FULL NOTICE</a>
            </Card>
          ))}
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