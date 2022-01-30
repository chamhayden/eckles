import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from './Logout';

const Header = ({ pageTitle, menuToggle, sidebarWidth}) => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${sidebarWidth}px)`, left: 0, minWidth: '400px', ml: `${sidebarWidth}px`, height: '60px' }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={menuToggle} 
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>
        <Logout />
      </Toolbar>
    </AppBar>
  );
}

export default Header;