import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { isTinyMobileWidth, isDesktopWidth } from '../../util/screen';

import SubNav from '../../component/SubNav';

import { Context, useContext } from '../../context';
import makePage from '../../component/makePage';
import config from '../../config';

const TimetableLectures = () => {
  const { getters } = useContext(Context);
  return <>
    <TableContainer component={Paper} sx={{maxWidth: 1000, margin: '0px auto'}}>
      <Table sx={{ minWidth: 350, }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Week</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">Day</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">Time</Typography></TableCell>
            {!isTinyMobileWidth() && <TableCell align="left"><Typography variant="h6">Lecturer</Typography></TableCell>}
            {getters.loggedIn && isDesktopWidth() && <TableCell align="left"><Typography variant="h6">Content</Typography></TableCell>}
            {getters.loggedIn && <TableCell align="left"><Typography variant="h6">Join</Typography></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {getters.content.schedule_lectures.map((row, rowKey) => (
            <TableRow
              key={rowKey}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="h6">{row.week().week}</Typography>
              </TableCell>
              <TableCell align="left">{row.day}</TableCell>
              <TableCell align="left">{row.time}</TableCell>
              {!isTinyMobileWidth() && <TableCell align="left">Hayden</TableCell>}
              {getters.loggedIn && isDesktopWidth() && <TableCell align="left">
                {row.content_lectures && (
                  <>
                    {
                    row.content_lectures().map(r => (
                      <div><Link to={`/${getters.term}/content/lectures/${r.key}`}>{r.name}</Link></div>
                    ))
                  }</>
                )}                
              </TableCell>}
              {getters.loggedIn && <TableCell align="left">{rowKey < 4 && <>
                      <h4>In-person in CLB7</h4><br />
                    </>}<Button variant="contained" onClick={() => {
                window.location.href = `${row.call_url_h}`;
              }}>Watch Live</Button></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>;
};

export default makePage(TimetableLectures, {
  loginRequired: false,
  title: 'Lecture Timetable',
});
