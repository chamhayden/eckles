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
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxWidth: 800,
          margin: '0 auto 30px auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
              }}
            >
              <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                <Typography variant="h6">Day</Typography>
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                <Typography variant="h6">Time</Typography>
              </TableCell>
              {/*!isTinyMobileWidth() && <TableCell align="left"><Typography variant="h6">Stream</Typography></TableCell>*/}
              {!isTinyMobileWidth() && (
                <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  <Typography variant="h6">Tutors</Typography>
                </TableCell>
              )}
              {getters.loggedIn && (
                <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  <Typography variant="h6">Join</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {getters.content.schedule_tutorials.map((row, rowKey) => (
              <TableRow
                key={rowKey}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: rowKey % 2 === 0 ? 'background.paper' : 'rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    transform: 'scale(1.005)',
                  },
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {row.day}
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 500 }}>
                  {row.times}
                </TableCell>
                {/*!isTinyMobileWidth() && <TableCell align="left">{row.stream}</TableCell>*/}
                {!isTinyMobileWidth() && (
                  <TableCell align="left" sx={{ fontWeight: 500 }}>
                    {row.staff
                      ? row
                          .staff()
                          .map((s) => s.name)
                          .join(', ')
                      : ''}
                  </TableCell>
                )}
                {getters.loggedIn && row.call_url_h && (
                  <TableCell align="left">
                    {row.call_url_h.includes('http') ? (
                      <Button
                        variant="contained"
                        onClick={() => {
                          window.location.href = row.call_url_h;
                        }}
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Join
                      </Button>
                    ) : (
                      <Typography sx={{ fontWeight: 600 }}>{row.call_url_h}</Typography>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default makePage(TimetableTutorials, {
  loginRequired: false,
  title: 'Tutorials Timetable',
});
