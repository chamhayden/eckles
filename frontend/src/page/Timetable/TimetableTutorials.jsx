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

const TimetableTutorials = () => {
  const { getters } = useContext(Context);
  return <>
    <TableContainer component={Paper} sx={{maxWidth: 800, margin: '0 auto 30px auto'}}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><Typography variant="h6">Day</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">Time</Typography></TableCell>
            {!isTinyMobileWidth() && <TableCell align="left"><Typography variant="h6">Stream</Typography></TableCell>}
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
              {!isTinyMobileWidth() && <TableCell align="left">{row.stream}</TableCell>}
              {!isTinyMobileWidth() && <TableCell align="left">{row.staff ? row.staff().map(s => s.name).join(', ') : ''}</TableCell>}
              {getters.loggedIn && <TableCell align="left"><Button variant="contained" onClick={() => {
                window.location.href = row.call_url
              }}>Watch</Button></TableCell>}
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