import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentCards from '../../../component/ContentCards';

const RelatedTutorials = ({ relatedTutorials }) => (
  <>
    {relatedTutorials.length > 0 && (
      <>
        <Box sx={{ pt: 2, mt: 8, borderTop: '1px solid', borderColor: 'divider' }} />
        <Typography variant="h4">Related Tutorial Videos</Typography>
        <ContentCards minHeight={220} data={relatedTutorials} />
      </>
    )}
  </>
);

export default RelatedTutorials;
