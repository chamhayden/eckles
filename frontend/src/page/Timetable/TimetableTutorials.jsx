import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { Context, useContext } from '../../context';
import makePage from '../../component/makePage';
import { isTinyMobileWidth } from '../../util/screen';
import config from '../../config';

const TimetableTutorials = () => {
  const { getters } = useContext(Context);
  return <>
    <div style={{ textAlign: 'center', marginBottom: '20px', }}>ONLINe tutorials are run on MS teams, please join them <a href="https://teams.microsoft.com/l/team/19%3aEua1eLL2oASZienf-Bf71zTkcaG7fpw3Dd-MuCKDnSg1%40thread.tacv2/conversations?groupId=9148b9c3-73a0-4017-a114-792e39aa2d22&tenantId=3ff6cfa4-e715-48db-b8e1-0867b9f9fba3" target="_blank">here</a>.</div>
    <TableContainer component={Paper} sx={{maxWidth: 800, margin: '0 auto 30px auto'}}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><Typography variant="h6">Day</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">Time</Typography></TableCell>
            {/*!isTinyMobileWidth() && <TableCell align="left"><Typography variant="h6">Stream</Typography></TableCell>*/}
            {!isTinyMobileWidth() && <TableCell align="left"><Typography variant="h6">Tutors</Typography></TableCell>}
            {getters.loggedIn && <TableCell align="left"><Typography variant="h6">Join</Typography></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {getters.content.schedule_tutorials.map((row, rowKey) => (
            <TableRow
              key={rowKey}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell align="left">{row.times}</TableCell>
              {/*!isTinyMobileWidth() && <TableCell align="left">{row.stream}</TableCell>*/}
              {!isTinyMobileWidth() && <TableCell align="left">{row.staff ? row.staff().map(s => s.name).join(', ') : ''}</TableCell>}
              {getters.loggedIn && row.call_url_h && <TableCell align="left">
                {row.call_url_h.includes('http') ? (
                  <Button variant="contained" onClick={() => {
                    window.location.href = row.call_url_h;
                  }}>Watch</Button>
                ) : (
                  <b>{row.call_url_h}</b>
                )}
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>;
};

export default makePage(TimetableTutorials, {
  loginRequired: false,
  title: 'Tutorials Timetable',
});
