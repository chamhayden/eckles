import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { Context, useContext } from '../context';
import config from '../config';
import { apiCall } from '../util/api';

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { getters, setters } = useContext(Context);

  const logoutFn = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      apiCall('logout', {}, 'POST').then((_) => {
        navigate('/login');
      });
    }
  };

  const login = () => {
    window.location.href = `${config.BASE_NAME}login`;
  };
  return (
    <Button
      onClick={getters.loggedIn ? logoutFn : login}
      sx={{
        ml: 2,
        borderRadius: '8px',
        fontWeight: 600,
        textTransform: 'none',
        height: '40px',
        minHeight: '40px',
        padding: '0 20px',
        transition: 'all 0.2s ease',
        color: '#f1f5f9',
        border: getters.isDark
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(30, 41, 59, 0.2)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        '&:hover': {
          backgroundColor: getters.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(37, 99, 235, 0.1)',
          borderColor: getters.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(37, 99, 235, 0.3)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      {getters.loggedIn ? 'Logout' : 'Login'}
    </Button>
  );
};

export default Logout;
