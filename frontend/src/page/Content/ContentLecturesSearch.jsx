import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheatersIcon from '@mui/icons-material/Theaters';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Outlet } from 'react-router-dom';
import { Context, useContext } from '../../context';
import TutLecContentCard from '../../component/TutLecContentCard';
import SubNavWrapper from '../../component/SubNavWrapper';
import makePage from '../../component/makePage';

const ContentLecturesSearch = ({ }) => {
  const { getters, setters } = useContext(Context);
  const {
    content_lectures,
    content_tutorials,
    schedule_lectures,
    schedule_tutorials,
    schedule_help_sessions,
    weeks,
    topics,
    staff,
  } = getters.content;
  console.log(
    'content_lectures', content_lectures,
    'content_tutorials', content_tutorials,
    'schedule_lectures', schedule_lectures,
    'schedule_tutorials', schedule_tutorials,
    'schedule_help_sessions', schedule_help_sessions,
    'weeks', weeks,
    'topics', topics,
    'staff', staff,
  );

  const week1 = weeks[0];
  console.log('week1', week1);
  console.log(week1.emoji);
  console.log(week1.kla);
  console.log(week1.week);
  console.log(week1.starts_on);
  console.log('schedule lectures', week1.schedule_lectures());
  console.log('schedule help_sessions', week1.schedule_help_sessions());
  console.log('content lectures', week1.content_lectures());
  console.log('content tutorials', week1.content_tutorials());
  console.log('content tutorials first one name', week1.content_tutorials()[0].name);
  console.log('content tutorials first one relevant lectures', week1.content_tutorials()[0].content_lectures()[0].name);
  console.log('All lectures', content_lectures[1]);

  return <>
    <TutLecContentCard name={content_lectures[1].name} duration_mins={content_lectures[1].duration_mins} relevance={content_lectures[1].relevance} />
  </>
};

export default makePage(ContentLecturesSearch, {
  loginRequired: true,
  title: '',
});