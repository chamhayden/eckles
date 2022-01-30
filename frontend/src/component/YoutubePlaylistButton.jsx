import Button from '@mui/material/Button';

const YoutubePlaylistButton = () => (
  <Button
    variant="contained"
    sx={{ margin: '0 auto 20px auto !important', display: 'block' }}
      onClick={() => window.location.href = 'https://www.youtube.com/playlist?list=PLi2pCZz5m6GHzROMkaqo5HuMoa2GvOYf3'}
    >
      View all lectures on YouTube
  </Button>
);

export default YoutubePlaylistButton;