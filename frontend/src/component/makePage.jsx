import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Context, useContext } from '../context';
import { loadContent } from '../util/content';
import AppLoad from './AppLoad';
import Site from '../page/Site';
import config from '../config';
import { apiCall } from '../util/api';

const makePage = (Component, options) => {
  return (props) => {
    const { getters, setters } = useContext(Context);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();

    React.useEffect(() => {
      if (options.title) {
        setters.setTitle(options.title);
      }
    }, [options.title]);

    React.useEffect(() => {
      if (cookies.eckles_loggedin) {
        setters.setLoggedIn(cookies.eckles_loggedin);
        apiCall('istutor', {}, 'POST')
          .then(result => {
            setters.setIsTutor(result.value)
          });
      }
    }, [cookies]);

    React.useEffect(() => {
      if (options.loginRequired && !cookies.eckles_loggedin) {
        window.location.href = `${config.BASE_NAME}login`;
      }
      
      if (getters.term && getters.validTerms.includes(getters.term)) {
        loadContent(getters.term, getters.loggedIn)
          .then(content => {
            setters.setContent(content);
            setters.setLoaded(true);
          })
          .catch((err) => console.log('Error!', err));
      }
    }, [getters.term, getters.validTerms, getters.loggedIn]);

    if (!getters.loaded) {
      return <AppLoad />;
    }
    return (
      <>
        <Component {...props} />
      </>
    );
  };
}

export default makePage;