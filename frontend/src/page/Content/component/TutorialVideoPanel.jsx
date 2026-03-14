import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Youtube from '../../../component/Youtube';

const TutorialVideoPanel = ({ tutorial }) => (
  <Accordion
    sx={{
      minWidth: 100,
      width: '100%',
      background: 'rgb(0,0,0)',
      '&.Mui-expanded': { margin: 0 },
      '& .MuiAccordionDetails-root': { padding: 0 },
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      overflow: 'hidden',
    }}
    expanded={true}
  >
    <AccordionDetails>
      {tutorial.video_author && (
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Tutor who recorded: {tutorial.video_author().name}
          </Typography>
        </Box>
      )}
      {tutorial.video_url ? (
        <Box
          sx={{
            width: '100%',
            '& iframe': {
              width: '100%',
              height: 'auto',
              aspectRatio: '16 / 9',
              margin: '0 !important',
              display: 'block',
            },
          }}
        >
          <Youtube code={tutorial.video_url} />
        </Box>
      ) : (
        <div
          style={{
            textAlign: 'center',
            margin: '100px 20px',
            fontSize: '2em',
            color: '#fff',
          }}
        >
          Recording not yet released.
        </div>
      )}
    </AccordionDetails>
  </Accordion>
);

export default TutorialVideoPanel;
