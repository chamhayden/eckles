import React from 'react';
import { createContext } from 'react';

export const initialValue = {
  sidebarOpen: true,
  content: {},
  loaded: false,
  loggedIn: false,
  title: 'COMP6080',
  term: '',
  validTerms: [],
  screenWidth: 1000,
  istutor: false,
  dark: window.localStorage.getItem('dark') !== null ? window.localStorage.getItem('dark') === "true" : false,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;