import SubNav from '../component/SubNav';

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
import CourseOutline22T1 from './CourseOutlines/CourseOutline22T1';
import CourseOutline22T3 from './CourseOutlines/CourseOutline22T3';
import CourseOutline23T1 from './CourseOutlines/CourseOutline23T1';
import CourseOutline23T3 from './CourseOutlines/CourseOutline23T3';
import CourseOutline24T1 from './CourseOutlines/CourseOutline24T1';
import CourseOutline24T3 from './CourseOutlines/CourseOutline24T3';
import CourseOutline25T1 from './CourseOutlines/CourseOutline25T1';
import CourseOutline25T3 from './CourseOutlines/CourseOutline25T3';
import CourseOutline26T1 from './CourseOutlines/CourseOutline26T1';

import { Context, useContext } from '../context';

const CourseOutline = () => {
  const { getters } = useContext(Context);
  if (getters.term === '22T1') {
    return <CourseOutline22T1 />;
  } else if (getters.term === '22T3') {
    return <CourseOutline22T3 />;
  } else if (getters.term === '23T1') {
    return <CourseOutline23T1 />;
  } else if (getters.term === '23T3') {
    return <CourseOutline23T3 />;
  } else if (getters.term === '24T1') {
    return <CourseOutline24T1 />;
  } else if (getters.term === '24T3') {
    return <CourseOutline24T3 />;
  } else if (getters.term === '25T1') {
    return <CourseOutline25T1 />;
  } else if (getters.term === '25T3') {
    return <CourseOutline25T3 />;
  } else if (getters.term === '26T1') {
    return <CourseOutline26T1 />;
  } else {
    return <>This is a sample course outline!</>;
  }
};

export default makePage(CourseOutline, {
  loginRequired: false,
  title: 'Course Outline',
});
