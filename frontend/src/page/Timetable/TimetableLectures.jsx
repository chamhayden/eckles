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

const getLectureStaffNames = (lecture) => {
  if (!lecture) return [];
  const staffValue = typeof lecture.staff === 'function' ? lecture.staff() : lecture.staff;
  if (!staffValue) return [];
  if (Array.isArray(staffValue)) {
    return staffValue
      .map((staff) => (typeof staff === 'string' ? staff : staff?.name))
      .filter(Boolean);
  }
  return [];
};

const getRowStaffNames = (row) => {
  if (!row?.content_lectures || typeof row.content_lectures !== 'function') {
    return '';
  }
  const lectures = row.content_lectures();
  const lectureList = Array.isArray(lectures) ? lectures : lectures ? [lectures] : [];
  return lectureList.flatMap((lecture) => getLectureStaffNames(lecture)).join(', ');
};

const TimetableLectures = () => {
  const { getters } = useContext(Context);
  const sortedLectures = [...getters.content.schedule_lectures].sort((a, b) => {
    const weekA = Number(a.week().week);
    const weekB = Number(b.week().week);
    if (Number.isNaN(weekA) || Number.isNaN(weekB)) {
      return String(a.week().week).localeCompare(String(b.week().week), undefined, {
        numeric: true,
      });
    }
    return weekA - weekB;
  });
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxWidth: 1000,
          margin: '0px auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
              }}
            >
              <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                <Typography variant="h6">Week</Typography>
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                <Typography variant="h6">Day</Typography>
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                <Typography variant="h6">Time</Typography>
              </TableCell>
              {!isTinyMobileWidth() && (
                <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  <Typography variant="h6">Lecturer</Typography>
                </TableCell>
              )}
              {getters.loggedIn && isDesktopWidth() && (
                <TableCell align="left" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  <Typography variant="h6">Content</Typography>
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
            {sortedLectures.map((row, rowKey) => (
              <TableRow
                key={rowKey}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: row.important
                    ? 'rgba(139, 92, 246, 0.08)'
                    : rowKey % 2 === 0
                      ? 'background.paper'
                      : 'rgba(0, 0, 0, 0.02)',
                  borderLeft: row.important ? '4px solid' : 'none',
                  borderLeftColor: row.important ? 'secondary.main' : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    transform: 'scale(1.005)',
                  },
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  {row.week().week}
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 500 }}>
                  {row.day.includes('📡') ? '📡 ' : ''}
                  {row.day.replace('📡', '').trim()}
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 500 }}>
                  {row.time}
                </TableCell>
                {!isTinyMobileWidth() && (
                  <TableCell align="left" sx={{ fontWeight: 500 }}>
                    {getRowStaffNames(row)}
                  </TableCell>
                )}
                {getters.loggedIn && isDesktopWidth() && (
                  <TableCell align="left">
                    {row.content_lectures && (
                      <>
                        {row.content_lectures().map((r, idx) => (
                          <div key={idx} style={{ marginBottom: '4px' }}>
                            <Link
                              to={`/${getters.term}/content/lectures/${r.key}`}
                              style={{ fontWeight: 500 }}
                            >
                              {r.name}
                            </Link>
                          </div>
                        ))}
                      </>
                    )}
                  </TableCell>
                )}
                {getters.loggedIn && (
                  <TableCell align="left">
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {row.location} &nbsp;
                      <a href={row.call_url_h} target="_blank" style={{ fontWeight: 600 }}>
                        (watch)
                      </a>
                    </Typography>
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

export default makePage(TimetableLectures, {
  loginRequired: false,
  title: 'Lecture Timetable',
});
