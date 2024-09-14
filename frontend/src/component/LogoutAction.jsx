import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Context, useContext } from '../context';

const LogoutAction = () => {
  const { getters, setters } = useContext(Context);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  React.useEffect(() => {
    setters.setLoggedIn(false);
    navigate('/');
  });
  return <></>;
};

export default LogoutAction;