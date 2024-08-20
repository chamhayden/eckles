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

import { Context, useContext } from '../context';

const Grades = () => {
  return <>
  	To see your details marks after assignment release, open a CSE terminal (either via SSH or in vlab) and run <code>6080 classrun -sturec</code>
  </>

}

export default makePage(Grades, {
  loginRequired: true,
  title: '💯 Grades',
});