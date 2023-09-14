import React from 'react';
import { Outlet } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoopIcon from '@mui/icons-material/Loop';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';

import SubNavWrapper from '../../component/SubNavWrapper';
import makePage from '../../component/makePage';

const HelpResources = ({ }) => {
  const menu = [
    {
      title: 'HTML/CSS',
      icon: <CodeIcon />,
      subRoute: 'htmlcss',
    },
    {
      title: 'Javascript',
      icon: <BuildIcon />,
      subRoute: 'javascript',
    },
    {
      title: 'ReactJS',
      icon: <LoopIcon />,
      subRoute: 'reactjs',
    },
    {
      title: 'Cypress',
      icon: <PodcastsIcon />,
      subRoute: 'cypress',
    },
    /*{
      title: 'Git',
      icon: <GitHubIcon />,
      subRoute: 'git',
    },
    {
      title: 'Network',
      icon: <PodcastsIcon />,
      subRoute: 'network',
    },*/
  ];

  return (
    <SubNavWrapper baseUrl={'/help/resources'} menu={menu}>
      If you have resources you think are useful, please don't hestitate to share them by putting in a <a target="_blank" href="https://github.com/chamhayden/eckles">pull request!</a>
      <Divider sx={{ mb: 3, mt: 3, }} />
      <Outlet />
    </SubNavWrapper>
  );
};

export default HelpResources