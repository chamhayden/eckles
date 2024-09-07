import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

hotjar.initialize(2818386, 6);
ReactGA.initialize('UA-219634058-1');
ReactGA.pageview(window.location.pathname + window.location.search);


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
