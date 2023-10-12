import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Context, useContext } from '../context';
import Header from '../component/Header';
import Navbar from '../component/Navbar';
import config from '../config';
import { apiCall } from '../util/api';
import { isMobileWidth, isDesktopWidth } from '../util/screen';

const drawerWidth = 230;

const SiteWrapper = ({ children }) => {
  const { getters, setters } = useContext(Context);
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const checkAndChangeWidth = () => {
    setters.setScreenWidth(window.innerWidth);
    if (isMobileWidth()) {
      setters.setSidebarOpen(false);
    }
    if (isDesktopWidth()) {
      setters.setSidebarOpen(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      checkAndChangeWidth();
    });
    checkAndChangeWidth();
  }, []);

  React.useEffect(() => {
    if (isMobileWidth()) {
      setters.setSidebarOpen(false);
    }
  }, [pathname])

  React.useEffect(() => {
    if (pathname === '/') {
      navigate(`/${config.DEFAULT_TERM}`);
      setters.setTerm(`${config.DEFAULT_TERM}`);
    } else if (params.term === 'NOW') {
      navigate(pathname.replace('NOW', config.DEFAULT_TERM));
    } else {
      setters.setTerm(`${params.term}`);
    }
  }, [params]);

  const sidebarRealTimeWidth = getters.sidebarOpen ? drawerWidth : 0;

  return (
    <>
      <CssBaseline/>
      <Helmet>
        <title>{getters.title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Helmet>
      <Box sx={{ display: 'flex', minWidth: '400px' }}>
        <Header pageTitle={getters.title} sidebarWidth={sidebarRealTimeWidth} menuToggle={() => setters.setSidebarOpen(!getters.sidebarOpen)} />
        <Navbar drawerWidth={drawerWidth} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  )
};

export default SiteWrapper;