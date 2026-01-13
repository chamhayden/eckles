import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const TitleCard = ({ children }) => {
  return (
    <Accordion sx={{ 
      marginTop: '20px !important', 
      marginLeft: 'auto !important', 
      marginRight: 'auto !important', 
      minWidth: 100,
      borderRadius: '12px !important',
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      '&:before': {
        display: 'none',
      },
      overflow: 'hidden',
    }} expanded={true}>
      <AccordionSummary
        //expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          color: 'primary.main',
        }}>{children}</Typography>
      </AccordionSummary>
    </Accordion>
  );
};

export default TitleCard;