import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

import { Context, useContext } from '../../context';
import makePage from '../../component/makePage';

// Matched as case-insensitive substrings, so "Mon", "Monday" and "📡 Monday" all land in the
// same column.
const COLUMNS = [
  { key: 'mon-tue', title: 'Lecture 1', match: ['mon', 'tue'] },
  { key: 'wed-thu', title: 'Lecture 2', match: ['wed', 'thu'] },
];

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const cleanDay = (day) =>
  String(day || '')
    .replace('📡', '')
    .trim();

const matchesColumn = (row, column) => {
  const day = cleanDay(row?.day).toLowerCase();
  return column.match.some((fragment) => day.includes(fragment));
};

const isStreamed = (row) => String(row?.day || '').includes('📡');

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

const getRowLectures = (row) => {
  if (!row?.content_lectures || typeof row.content_lectures !== 'function') {
    return [];
  }
  const lectures = row.content_lectures();
  return Array.isArray(lectures) ? lectures : lectures ? [lectures] : [];
};

const getRowStaffNames = (row) =>
  [...new Set(getRowLectures(row).flatMap((lecture) => getLectureStaffNames(lecture)))].join(', ');

const getWeekLabel = (row) => row?.week?.()?.week;

const getWeekNumber = (row) => {
  const week = Number(getWeekLabel(row));
  return Number.isNaN(week) ? Number.MAX_SAFE_INTEGER : week;
};

const parseStartMinutes = (time) => {
  const match = String(time || '')
    .trim()
    .match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  let hour = parseInt(match[1], 10);
  const min = match[2] ? parseInt(match[2], 10) : 0;
  const meridiem = (match[3] || '').toLowerCase();
  if (meridiem === 'pm' && hour !== 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;
  return hour * 60 + min;
};

const dayRank = (row) => {
  const day = cleanDay(row?.day).toLowerCase();
  const index = DAY_ORDER.findIndex((fragment) => day.includes(fragment));
  return index === -1 ? DAY_ORDER.length : index;
};

const sortLectures = (a, b) => {
  const dayDiff = dayRank(a) - dayRank(b);
  if (dayDiff !== 0) return dayDiff;
  return parseStartMinutes(a.time) - parseStartMinutes(b.time);
};

// Important and unimportant lectures stay visually distinct: important sessions get a solid
// purple accent, unimportant ones a muted, dashed grey accent (dashes so the distinction
// survives without relying on colour alone).
const cardStyles = (important) => (theme) => {
  const dark = theme.palette.mode === 'dark';
  return important
    ? {
        borderColor: dark ? 'rgba(167, 139, 250, 0.45)' : 'rgba(139, 92, 246, 0.35)',
        borderLeft: '5px solid',
        borderLeftColor: 'secondary.main',
        backgroundColor: dark ? 'rgba(167, 139, 250, 0.12)' : 'rgba(139, 92, 246, 0.08)',
      }
    : {
        borderColor: 'divider',
        borderLeft: '5px dashed',
        borderLeftColor: dark ? 'rgba(148, 163, 184, 0.5)' : 'rgba(100, 116, 139, 0.35)',
        backgroundColor: dark ? 'rgba(148, 163, 184, 0.06)' : 'rgba(100, 116, 139, 0.04)',
      };
};

const LectureCard = ({ row, loggedIn, term }) => {
  const staffNames = getRowStaffNames(row);
  const contentLectures = getRowLectures(row);
  return (
    <Paper
      elevation={0}
      sx={[
        {
          border: '1px solid',
          borderRadius: '12px',
          p: { xs: 1.5, sm: 2 },
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 2,
          },
        },
        cardStyles(row.important),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          columnGap: 1,
          mb: staffNames || contentLectures.length ? 1 : 0,
        }}
      >
        <Typography
          component="span"
          sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 0, lineHeight: 1.5 }}
        >
          {isStreamed(row) ? '📡 ' : ''}
          {cleanDay(row.day)}
        </Typography>
        <Typography
          component="span"
          sx={{ fontWeight: 500, color: 'text.secondary', mb: 0, lineHeight: 1.5 }}
        >
          {row.time}
        </Typography>
      </Box>

      {staffNames && (
        <Typography variant="body2" sx={{ mb: 0.5, color: 'text.secondary', fontWeight: 500 }}>
          {staffNames}
        </Typography>
      )}

      {loggedIn && contentLectures.length > 0 && (
        <Box sx={{ mb: 0.5 }}>
          {contentLectures.map((lecture, idx) => (
            <div key={idx} style={{ marginBottom: '2px' }}>
              <Link to={`/${term}/content/lectures/${lecture.key}`} style={{ fontWeight: 500 }}>
                {lecture.name}
              </Link>
            </div>
          ))}
        </Box>
      )}

      {loggedIn && (row.location || row.call_url_h) && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1,
            mt: 1.5,
            pt: 1.5,
            borderTop: '1px solid',
            borderTopColor: 'divider',
          }}
        >
          {row.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography
                component="span"
                sx={{ fontWeight: 700, fontSize: '1rem', mb: 0, lineHeight: 1.4 }}
              >
                {row.location}
              </Typography>
            </Box>
          )}
          {row.call_url_h && (
            <Button
              variant="contained"
              size="small"
              href={row.call_url_h}
              target="_blank"
              rel="noreferrer"
              startIcon={<PlayCircleFilledIcon />}
              sx={{ fontWeight: 700, ml: { sm: 'auto' } }}
            >
              Watch
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
};

const EmptyCell = () => (
  <Box
    sx={{
      border: '1px dashed',
      borderColor: 'divider',
      borderRadius: '12px',
      p: { xs: 1.5, sm: 2 },
      opacity: 0.6,
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.04)' : 'rgba(100, 116, 139, 0.03)',
    }}
  >
    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0, fontStyle: 'italic' }}>
      No lecture
    </Typography>
  </Box>
);

const WeekCell = ({ column, lectures, loggedIn, term }) => (
  <Box>
    {/* Stacked on mobile the column headers are out of view, so each cell restates its days. */}
    <Typography
      sx={{
        display: { xs: 'block', md: 'none' },
        mb: 0.5,
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'text.secondary',
        opacity: 0.75,
      }}
    >
      {column.title}
    </Typography>
    {lectures.length === 0 ? (
      <EmptyCell />
    ) : (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {lectures.map((row, idx) => (
          <LectureCard key={idx} row={row} loggedIn={loggedIn} term={term} />
        ))}
      </Box>
    )}
  </Box>
);

const TimetableLectures = () => {
  const { getters } = useContext(Context);
  const allLectures = getters.content.schedule_lectures || [];

  // One grid row per week, so lecture 1 always lines up beside lecture 2. Rows come from the
  // weeks table rather than from the lectures, so a week with nothing scheduled still gets a
  // row (greyed out) instead of disappearing from the timetable.
  const weekOrder = (getters.content.weeks || []).map((week) => week.week);
  const byWeek = new Map(weekOrder.map((label) => [label, []]));
  for (const row of [...allLectures].sort((a, b) => getWeekNumber(a) - getWeekNumber(b))) {
    const label = getWeekLabel(row) ?? 'Unscheduled';
    if (!byWeek.has(label)) {
      byWeek.set(label, []);
      weekOrder.push(label);
    }
    byWeek.get(label).push(row);
  }

  return (
    <Box sx={{ maxWidth: 1100, margin: '0 auto', px: { xs: 0, sm: 1 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          columnGap: 3,
          rowGap: 1.5,
          alignItems: 'stretch',
        }}
      >
        {COLUMNS.map((column) => (
          <Typography
            key={column.key}
            variant="h6"
            sx={{
              display: { xs: 'none', md: 'block' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 0,
              pb: 1,
              borderBottom: '2px solid',
              borderBottomColor: 'rgba(37, 99, 235, 0.15)',
            }}
          >
            {column.title}
          </Typography>
        ))}

        {weekOrder.map((weekLabel) => {
          const weekLectures = byWeek.get(weekLabel);
          // Anything outside Mon-Thu still needs somewhere to live rather than silently vanishing.
          const otherDays = weekLectures
            .filter((row) => !COLUMNS.some((column) => matchesColumn(row, column)))
            .sort(sortLectures);
          return (
            <React.Fragment key={weekLabel}>
              <Typography
                sx={{
                  gridColumn: '1 / -1',
                  mt: { xs: 3.5, md: 2.5 },
                  mb: 0.5,
                  pb: 0.75,
                  borderBottom: '2px solid',
                  borderBottomColor: 'divider',
                  fontWeight: 800,
                  fontSize: { xs: '1.3rem', md: '1.1rem' },
                  color: 'text.primary',
                }}
              >
                {weekLabel === 'Unscheduled' ? 'Unscheduled' : `Week ${weekLabel}`}
              </Typography>
              {COLUMNS.map((column) => (
                <WeekCell
                  key={column.key}
                  column={column}
                  lectures={weekLectures
                    .filter((row) => matchesColumn(row, column))
                    .sort(sortLectures)}
                  loggedIn={getters.loggedIn}
                  term={getters.term}
                />
              ))}
              {otherDays.length > 0 && (
                <Box
                  sx={{
                    gridColumn: '1 / -1',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {otherDays.map((row, idx) => (
                    <LectureCard
                      key={idx}
                      row={row}
                      loggedIn={getters.loggedIn}
                      term={getters.term}
                    />
                  ))}
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default makePage(TimetableLectures, {
  loginRequired: false,
  title: 'Lecture Timetable',
});
