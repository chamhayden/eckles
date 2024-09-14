import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';


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
  const [isDark, setDark] = React.useState(initialValue.dark)

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
    isDark
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
    setDark
  }

  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    }
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        'default': '#121212',
        'paper': '#191919'
      },
      primary: {
        main: '#2998f2'
      },
      info: {
        main: '#0868e4'
      },
      text: {
        primary: '#f9f9f9',
      }
    }
  })

  return (
  <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <ScopedCssBaseline sx={{
      minHeight:'100%'
    }}>
      <Context.Provider value={{ getters, setters, }}>
        <CookiesProvider>
          <BrowserRouter basename={config.BASE_NAME}>
            <Router />
          </BrowserRouter>
        </CookiesProvider>
      </Context.Provider>
    </ScopedCssBaseline>
  </ThemeProvider>
  );
};

export default App;