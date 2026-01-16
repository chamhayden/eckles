import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Youtube from '../../component/Youtube';
import makePage from '../../component/makePage';

const ResourcesPostgrad = ({}) => {
  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Postgraduates
      </Typography>
      <Typography variant="body1" gutterBottom>
        Postgraduates start COMP6080 with less prerequisite knowledge namely in the areas of Git and
        HTTP Servers. To help our wonderful postgraduates out, one of our team (who themselves
        happens to be a postgraduate) have put together a helpful getting started guide just for
        you.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <a target="_blank" href="https://cgi.cse.unsw.edu.au/~cs6080/raw/postgrad-guide.pdf">
          Postgraduate guide
        </a>
      </Typography>
    </>
  );
};

export default makePage(ResourcesPostgrad, {
  loginRequired: true,
  title: 'Postgrad',
});
