import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import TheatersIcon from '@mui/icons-material/Theaters';
import SchoolIcon from '@mui/icons-material/School';
import { Outlet } from 'react-router-dom';

import SubNavWrapper from '../../component/SubNavWrapper';
const ContentLectures = ({}) => {
  const menu = [
    {
      title: 'By Week',
      icon: <TheatersIcon />,
      subRoute: 'week',
    },
    {
      title: 'By Topic',
      icon: <SchoolIcon />,
      subRoute: 'topic',
    },
  ];

  return (
    <SubNavWrapper baseUrl={'/content/lectures'} menu={menu}>
      <Outlet />
    </SubNavWrapper>
  );
};

export default ContentLectures;
