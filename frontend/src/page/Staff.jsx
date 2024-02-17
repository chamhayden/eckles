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
import Table from '../component/Table';

import { Context, useContext } from '../context';

const Staff = () => {
  const { getters } = useContext(Context);
  const staff = getters.content.staff.filter(s => s.active);
  staff.sort((a,b) => a.name.localeCompare(b.name));
  const data = staff.map((staff, idx) => (
    [
      {
        key: 'name',
        data: staff.name,
        flex: 1,
      },
      {
        key: 'email',
        data: `z${staff.zid}@unsw.edu.au`,
        flex: 1,
        editable: true,
      },
    ]
  ));

  return <Table data={data} maxWidth={600} />
  return <></>;

}

export default makePage(Staff, {
  loginRequired: true,
  title: '⚽️ Our Staff',
});