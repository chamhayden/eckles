import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import config from './config';
import './index.css';
import Router from './Router';
import reportWebVitals from './reportWebVitals';
import { Context, initialValue } from './context';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(initialValue.sidebarOpen);
  const [content, setContent] = React.useState(initialValue.content);
  const [loaded, setLoaded] = React.useState(initialValue.loaded);
  const [loggedIn, setLoggedIn] = React.useState(initialValue.loggedIn);
  const [title, setTitle] = React.useState(initialValue.title);
  const [term, setTerm] = React.useState(initialValue.term);
  const [zid, setZid] = React.useState(initialValue.zid);
  const [validTerms, setValidTerms] = React.useState(initialValue.validTerms);
  const [screenWidth, setScreenWidth] = React.useState(initialValue.screenWidth);
  const [isTutor, setIsTutor] = React.useState(initialValue.isTutor);

  const getters = {
    sidebarOpen,
    content,
    loaded,
    loggedIn,
    title,
    term,
    zid,
    validTerms,
    screenWidth,
    isTutor,
  };
  const setters = {
    setSidebarOpen,
    setContent,
    setLoaded,
    setLoggedIn,
    setTitle,
    setTerm,
    setZid,
    setValidTerms,
    setScreenWidth,
    setIsTutor,
  }
  return (
    <Context.Provider value={{ getters, setters, }}>
      <CookiesProvider>
        <BrowserRouter basename={config.BASE_NAME}>
          <Router />
        </BrowserRouter>
      </CookiesProvider>
    </Context.Provider>
  );
};

export default App;