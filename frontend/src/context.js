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
  dark: false,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;