import React from 'react';
import Typography from '@mui/material/Typography';

import makePage from '../../component/makePage';

const ResourcesReact = ({}) => {
  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        ReactJS
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li><a target="_blank" href="https://github.com/airbnb/javascript/tree/master/react">Airbnb Style Guide</a>. This is a great introductory style guide to ReactJS due to it's very strict nature. This can help develop good practices (source: Hayden Smith).</li>
          <li><a target="_blank" href="https://scrimba.com/course/glearnreact">Scrimba Learn React</a>. Another product out there helping you teach yourself how to build apps with ReactJS (source: Unknown).</li>
          <li>LinkedIn learning is available to UNSW students for free and has great courses involving ReactJS (source: Hayden Smith).</li>
        </ul>
      </Typography>
       
    </>
  );
};

export default makePage(ResourcesReact, {
  loginRequired: true,
  title: 'ReactJS Resources',
});