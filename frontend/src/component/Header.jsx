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
import { Switch } from '@mui/material';
import { Context, useContext } from '../context';
import { styled } from '@mui/material/styles';

//https://mui.com/material-ui/react-switch/
const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 20 / 2,
  },
}));

const Header = ({ pageTitle, menuToggle, sidebarWidth}) => {
  const { getters, setters } = useContext(Context);

  const handleChange = (e) => {
    setters.setDark(e.target.checked)
    window.localStorage.setItem('dark', e.target.checked)
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        left: 0,
        ml: `${sidebarWidth}px`,
        height: "60px",
        color: getters.isDark ? '#f1f5f9' : '#1e293b',
        borderBottom: getters.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar sx={{ 
        height: '60px', 
        minHeight: '60px !important', 
        display: 'flex', 
        alignItems: 'center',
        paddingTop: '0 !important', 
        paddingBottom: '0 !important' 
      }}>
        <IconButton
          size="medium"
          edge="start"
          aria-label="menu"
          sx={{ 
            mr: 1.5,
            color: '#f1f5f9',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'rotate(90deg)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
          onClick={menuToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            paddingTop: '12px',
            color: 'white',
          }}
        >
          {pageTitle}
        </Typography>
        <DarkModeSwitch
          defaultChecked={getters.isDark}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}        
        />
        <Logout />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
