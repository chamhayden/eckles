import React from 'react';
import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import mainlogo from '../asset/mainlogo.png';
import cloud from '../asset/cloud.png';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Stack from '@mui/material/Stack';

import AppLoad from '../component/AppLoad';
import { apiCall } from '../util/api';
import config from '../config';
import { Context, useContext } from '../context';
import { Box } from '@mui/system';
const theme = createTheme();
/* Sourced https://github.com/mui-org/material-ui/blob/v3.x/docs/src/pages/getting-started/page-layout-examples/sign-in/SignIn.js */
const styles = {
  '@keyframes cloudDrift': {
    '0%, 100%': {
      left: '0%',
    },
    '50%': {
      left: '-6%',
    },
  },
  '@keyframes cloudDrift2': {
    '0%, 100%': {
      left: '-10%',
    },
    '50%': {
      left: '-6%',
    },
  },
  '@keyframes cloudDrift3': {
    '0%, 100%': {
      right: '-10%',
    },
    '50%': {
      right: '-6%',
    },
  },
  main: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(3),
    overflowX: 'hidden',

    background: `
    radial-gradient(
      60% 80% at 75% 50%,
      rgba(120, 170, 220, 0.45),
      transparent 70%
    ),
    radial-gradient(
      40% 60% at 20% 30%,
      rgba(200, 210, 220, 0.35),
      transparent 65%
    ),
    radial-gradient(
      20% 30% at 80% 70%,
      rgba(240, 210, 180, 0.25),
      transparent 60%
    ),
    linear-gradient(
      165deg,
      rgba(236, 244, 255, 0.95) 0%,
      rgba(221, 234, 255, 0.75) 100%
    )
  `,

    boxShadow: 'inset 0 0 0 1px rgba(120, 159, 255, 0.16)',
  },
  paper: {
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    background: 'transparent',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing(2),
    borderRadius: '10px',
    padding: '12px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
    },
  },
  logo: {
    zIndex: 10,
    position: 'absolute',
    right: '-46%',
    bottom: '-6%',
    width: '100%',
    maxWidth: '290px',
    marginBottom: '24px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '150px',
      top: '-11%',
      bottom: 'auto',
      right: '-9%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '150px',
      top: '-11%',
      bottom: 'auto',
      right: '-9%',
    }
  },
  cloud: {
    zIndex: 0,
    position: 'absolute',
    left: '50%',
    top: '-10%',
    width: '100%',
    maxWidth: '120px',
    marginBottom: '24px',
    opacity: 0.8,
    animation: '$cloudDrift 6s ease-in-out infinite',
    [theme.breakpoints.down('md')]: {
      maxWidth: '50px',
      animation: '$cloudDrift3 6s ease-in-out infinite',
      left: 'auto',
      right: '-3%',
      top: '-10%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '50px',
      animation: '$cloudDrift3 6s ease-in-out infinite',
      left: 'auto',
      right: '-3%',
      top: '-10%',
    },
  },
  cloud2: {
    zIndex: 0,
    position: 'absolute',
    left: '2%',
    top: '-1%',
    width: '100%',
    maxWidth: '80px',
    marginBottom: '24px',
    opacity: 0.8,
    animation: '$cloudDrift2 6s ease-in-out infinite',
    [theme.breakpoints.down('md')]: {
      maxWidth: '30px',
      animation: '$cloudDrift3 6s ease-in-out infinite',
      left: 'auto',
      right: '-3%',
      top: '-10%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '30px',
      animation: '$cloudDrift3 6s ease-in-out infinite',
      left: 'auto',
      right: '-3%',
      top: '-10%',
    },

  },
  disclaimer: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '10pt',
    lineHeight: '1.6',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: 'rgba(100, 116, 139, 0.05)',
    borderRadius: '12px',
  },
};

const SignIn = (props) => {
  // dialog state
  const [open, setOpen] = React.useState(false);
  const { getters } = useContext(Context);
  const [zid, setZid] = React.useState('');
  const [zpass, setZpass] = React.useState('');
  const [term, setTerm] = React.useState('');
  const [cookies] = useCookies();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClickOpen = (message) => {
    setErrorMessage(message); // Set the error message
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (cookies.eckles_loggedin) {
      navigate('/');
    }
  });

  React.useEffect(() => {
    if (getters.validTerms.length > 0) {
      setTerm(getters.validTerms[0]);
    }
  }, [getters.validTerms]);

  const login = (zid, zpass, term) => {
    setLoading(true);
    apiCall('login', { term, zid, zpass }, 'POST', handleClickOpen)
      .then((_) => {
        localStorage.removeItem('eckles_content');
        localStorage.removeItem('eckles_expiry');
        window.location.href = `${config.BASE_NAME}${term}`;
      })
      .finally((_) => setLoading(false));
  };

  const { classes } = props;

  if (loading) {
    return <AppLoad />;
  }
  

  return (
    <main className={classes.main}>
      <Paper className={classes.paper} elevation={0} sx={{ background: 'transparent' }}>
        <Box className={classes.container}>
            <img className={classes.logo} src={mainlogo} alt="mainlogo" />
            <img className={classes.cloud} src={cloud} alt="cloud" />
            <img className={classes.cloud2} src={cloud} alt="cloud" />

            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                lineHeight: 1.3,
                background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              COMP6080
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                fontSize: '1rem',
              }}
            >
              Welcome back! Sign in with your zID.
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">zid</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  placeholder="z1234567"
                  value={zid}
                  onChange={(e) => setZid(e.target.value)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">zpass</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={zpass}
                  onChange={(e) => setZpass(e.target.value)}
                />
              </FormControl>

              {getters.validTerms.length > 1 && (
                <FormControl>
                  <FormLabel sx={{ marginTop: '15px', marginBottom: '5px' }} id="demo-select-label">
                    Term
                  </FormLabel>
                  <Select
                    labelId="demo-select-label"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  >
                    {getters.validTerms
                      .sort()
                      .reverse()
                      .map((term, key) => (
                        <MenuItem key={key} value={term}>
                          {term}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => login(zid, zpass, term)}
                  sx={{
                    borderRadius: '10px',
                    padding: '12px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #5b7fcbff 0%, #2a57d2ff 100%)',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                    },
                  }}
                >
                  Sign in →
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => (window.location.href = config.BASE_NAME)}
                  sx={{
                    borderRadius: '10px',
                    padding: '12px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderWidth: '2px',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                    },
                  }}
                >
                  ← Back to Home
                </Button>
              </Stack>

            </form>
        </Box>

          <p className={classes.disclaimer}>
            Your password and credentials are not stored by either this software or by teaching
            staff. If you change your UNSW password due to suspected compromise, please email
            cs6080@cse.unsw.edu.au to inform us as well.
          </p>
      </Paper>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
