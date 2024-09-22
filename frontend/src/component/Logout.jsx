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
      apiCall('logout', {}, 'POST')
      .then(_ => {
        navigate('/login');
      })
    }
  }

  const login = () => {
    window.location.href = `${config.BASE_NAME}login`;
  }
  return (
    <Button
      color="inherit"
      onClick={getters.loggedIn ? logoutFn : login}
    >
      {getters.loggedIn ? 'Logout' : 'Login'}
    </Button>
  );
};

export default Logout;