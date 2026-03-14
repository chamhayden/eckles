import Button from '@mui/material/Button';

const YoutubePlaylistButton = () => (
  <Button
    variant="contained"
    sx={{ margin: '0 auto 20px auto !important', display: 'block' }}
    onClick={() =>
      (window.location.href =
        'https://www.youtube.com/watch?v=kU1lGsUqqIE&list=PLi2pCZz5m6GH_-23-LKG7ZgfE5TbbFdQK&index=1')
    }
  >
    View all lectures on YouTube
  </Button>
);

export default YoutubePlaylistButton;
