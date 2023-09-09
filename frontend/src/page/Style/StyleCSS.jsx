import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import makePage from '../../component/makePage';

const StyleCss = ({}) => {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        Test
      </Typography>
       
    </>
  );
};

export default makePage(StyleCss, {
  loginRequired: true,
  title: 'CSS Style',
});