import React from 'react';

import makePage from '../../component/makePage';

const HelpStyle = ({}) => {
  return (
    <>
      HelpStyle
      <h2>HTML/CSS</h2>
      <p>
        <a target="_blank" href="https://google.github.io/styleguide/htmlcssguide.html">
          Google Style Guide
        </a>
      </p>
      <h2>Javascript / NodeJS</h2>
      <p>
        <a target="_blank" href="https://google.github.io/styleguide/jsguide.html">
          Google Style Guide
        </a>
      </p>
      <h2>ReactJS</h2>
      <p>
        <a target="_blank" href="https://github.com/airbnb/javascript/tree/master/react">
          Airbnb Style Guide
        </a>
      </p>
    </>
  );
};

export default makePage(HelpStyle, {
  loginRequired: false,
  title: 'Style Help',
});
