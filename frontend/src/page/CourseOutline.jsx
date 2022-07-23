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

import { Context, useContext } from '../context';

const CourseOutline = () => {
  const { getters } = useContext(Context);
  if (getters.term === '22T1') {
    return <CourseOutline22T1 />
  } else if (getters.term === '22T3') {
    return <CourseOutline22T3 />
  } else {
    return <>This is a sample course outline!</>;
  }
}

export default makePage(CourseOutline, {
  loginRequired: false,
  title: 'Course Outline',
});