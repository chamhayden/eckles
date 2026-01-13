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
      mode: 'light',
      primary: {
        main: '#2563eb',
        light: '#3b82f6',
        dark: '#1d4ed8',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
      },
      success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
      },
      background: {
        default: '#f8f9fc',
        paper: '#ffffff',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
      }
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      fontSize: 16,
      h1: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.6em' },
      h2: { fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '0.6em' },
      h3: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '0.6em' },
      h4: { fontWeight: 600, lineHeight: 1.35, marginBottom: '0.6em' },
      h5: { fontWeight: 600, lineHeight: 1.4, marginBottom: '0.6em' },
      h6: { fontWeight: 600, lineHeight: 1.4, marginBottom: '0.6em' },
      body1: { fontSize: '1rem', lineHeight: 1.7, marginBottom: '0.85em' },
      body2: { fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '0.65em' },
      button: { textTransform: 'none', fontWeight: 500, lineHeight: 1.5 },
    },
    spacing: 8,
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    ],
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
      },
      secondary: {
        main: '#a78bfa',
        light: '#c4b5fd',
        dark: '#8b5cf6',
      },
      success: {
        main: '#34d399',
        light: '#6ee7b7',
        dark: '#10b981',
      },
      background: {
        default: '#0f172a',
        paper: '#1e293b',
      },
      text: {
        primary: '#f1f5f9',
        secondary: '#94a3b8',
      }
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      fontSize: 16,
      h1: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.6em' },
      h2: { fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '0.6em' },
      h3: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '0.6em' },
      h4: { fontWeight: 600, lineHeight: 1.35, marginBottom: '0.6em' },
      h5: { fontWeight: 600, lineHeight: 1.4, marginBottom: '0.6em' },
      h6: { fontWeight: 600, lineHeight: 1.4, marginBottom: '0.6em' },
      body1: { fontSize: '1rem', lineHeight: 1.7, marginBottom: '0.85em' },
      body2: { fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '0.65em' },
      button: { textTransform: 'none', fontWeight: 500, lineHeight: 1.5 },
    },
    spacing: 8,
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
      '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
      '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
      '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
      '0 25px 50px -12px rgb(0 0 0 / 0.5)',
    ],
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