import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TitleCard = ({ children }) => {
  return (
    <Box
      sx={{
        margin: '32px 2px 16px 2px',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-8px',
          left: 0,
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, #2563eb 0%, #8b5cf6 100%)',
          borderRadius: '2px',
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default TitleCard;
