import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TitleCard = ({ children }) => {
  return (
    <Box sx={{ margin: '45px 2px 20px 2px' }}>
      <Typography variant="h5">{children}</Typography>
    </Box>
  );
};

export default TitleCard;