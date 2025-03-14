import SubNav from '../component/SubNav';

import { Link } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import makePage from '../component/makePage';
import Table from '../component/Table';

import { apiCall } from '../util/api';
import { Context, useContext } from '../context';

const Grades = () => {

  const { getters, setters } = useContext(Context);
  const [grades, setGrades] = React.useState([]);

  const [zid, setZid] = React.useState('');

  const getGrades = () => {
    apiCall(`grades?term=${getters.term}&searchZid=${zid}`, { }, 'GET')
      .then(data => {
        setGrades(data);
      });
  }
  React.useEffect(() => {
    getGrades();
  }, []);

  return <>
  	{grades.length === 0 ? (
      <>Loading...</>
    ) : (
      <>

        {getters.isTutor &&
          <>
           <input type="text" value={zid} onChange={e => setZid(e.target.value)} placeholder="5555555" />
           <br />
           <button onClick={getGrades}>Search</button>
           <br />
          </>
        }
        <br />
        <table border="1" cellPadding="5">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          {grades.map((value, key) => (
            <tr>
              <td>{value[0]}</td>
              <td>{value[1]}</td>
            </tr>
          ))}
        </table>
      </>
    )}
  </>

}

export default makePage(Grades, {
  loginRequired: true,
  title: '💯 Grades',
});