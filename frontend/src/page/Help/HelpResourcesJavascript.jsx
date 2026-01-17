import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import makePage from '../../component/makePage';

const ResourcesJavscript = ({}) => {
  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        General JS
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li>
            <a target="_blank" href="https://scrimba.com/course/gintrotoes6">
              Scrimba ES6 Intro
            </a>
            . An introduction to the ES6 language (source: Unknown).
          </li>
        </ul>
      </Typography>

      <Divider sx={{ mb: 3, mt: 3 }} />

      <Typography variant="h5" component="div" gutterBottom>
        Async JS
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li>
            <a target="_blank" href="http://latentflip.com/loupe">
              Loupe
            </a>
            . Visualisation of Javascript call stack/event (source: Unknown).
          </li>
        </ul>
      </Typography>
    </>
  );
};

export default makePage(ResourcesJavscript, {
  loginRequired: true,
  title: 'Javascript Resources',
});
