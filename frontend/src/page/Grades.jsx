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
    apiCall(`gradesearch?term=${getters.term}&searchZid=${zid}`, { }, 'GET')
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
        <h1>Main grades</h1>
        <table border="1" cellPadding="5">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          {grades.main.map((value, key) => (
            <tr>
              <td>{value[0]}</td>
              {(value[1] === '.' || value[1] === '') ? (
                <td><small><small><small>Unreleased</small></small></small></td>
              ) : (
                <td>{value[1].replace('{', '').replace('}', '')}{value[2] && ` / ${value[2]}`}</td>
              )}
            </tr>
          ))}
        </table>
        <h1>Ass1 Breakdown</h1>
        <table border="1" cellPadding="5">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          {grades.ass1.map((value, key) => (
            <tr>
              <td>{value[0]}</td>
              {(value[1] === '.' || value[1] === '') ? (
                <td><small><small><small>Unreleased</small></small></small></td>
              ) : (
                <td>{value[1].replace('{', '').replace('}', '')}{value[2] && ` / ${value[2]}`}</td>
              )}
            </tr>
          ))}
        </table>
        <h1>Ass2 Breakdown</h1>
        <table border="1" cellPadding="5">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          {grades.ass2.map((value, key) => (
            <tr>
              <td>{value[0]}</td>
              {(value[1] === '.' || value[1] === '') ? (
                <td><small><small><small>Unreleased</small></small></small></td>
              ) : (
                <td>{value[1].replace('{', '').replace('}', '')}{value[2] && ` / ${value[2]}`}</td>
              )}
            </tr>
          ))}
        </table>
        <h1>Ass3 Breakdown</h1>
        <table border="1" cellPadding="5">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          {grades.ass3.map((value, key) => (
            <tr>
              <td>{value[0]}</td>
              {(value[1] === '.' || value[1] === '') ? (
                <td><small><small><small>Unreleased</small></small></small></td>
              ) : (
                <td>{value[1].replace('{', '').replace('}', '')}{value[2] && ` / ${value[2]}`}</td>
              )}
            </tr>
          ))}
        </table>
        <h1>Ass4 Breakdown</h1>
        <table border="1" cellPadding="5">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          {grades.ass4.map((value, key) => (
            <tr>
              <td>{value[0]}</td>
              {(value[1] === '.' || value[1] === '') ? (
                <td><small><small><small>Unreleased</small></small></small></td>
              ) : (
                <td>{value[1].replace('{', '').replace('}', '')}{value[2] && ` / ${value[2]}`}</td>
              )}
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