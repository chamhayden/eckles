import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { withStyles, } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import mainlogo from '../asset/mainlogo.png';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import AppLoad from '../component/AppLoad';
import { apiCall } from '../util/api';
import config from '../config';
import { Context, useContext } from '../context';

const theme = createTheme();
/* Sourced https://github.com/mui-org/material-ui/blob/v3.x/docs/src/pages/getting-started/page-layout-examples/sign-in/SignIn.js */
const styles = ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paddingTop: theme.spacing.unit * 8,
  },
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `20px 20px 20px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  logo: {
    width: '100%',
    maxWidth: '350px',
    marginBottom: '20px',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: '9pt',
  },
});

const SignIn = (props) => {
  // dialog state
  const [open, setOpen] = React.useState(false);
  const { getters } = useContext(Context);
  const [zid, setZid] = React.useState('');
  const [zpass, setZpass] = React.useState('');
  const [term, setTerm] = React.useState(['sample']);
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
    setTerm(getters.validTerms[0]);
  }, [getters.validTerms]);

  const login = (zid, zpass, term) => {
    setLoading(true);
    apiCall('login', { term, zid, zpass }, 'POST', handleClickOpen)
      .then(_ => {
        localStorage.removeItem('eckles_content');
        localStorage.removeItem('eckles_expiry');
        window.location.href = `${config.BASE_NAME}${term}`
      })
      .finally(_ => setLoading(false));
  }

  const { classes } = props;

  if (loading) {
    return <AppLoad />;
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <img className={classes.logo} src={mainlogo} alt='mainlogo'/>
        <Typography component="h1" variant="h5">
          Sign in to COMP6080
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">zid</InputLabel>
            <Input id="username" name="username" autoComplete="username" autoFocus placeholder="z1234567" value={zid} onChange={e => setZid(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">zpass</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={zpass} onChange={e => setZpass(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ marginTop: '15px', marginBottom: '5px' }} id="demo-radio-buttons-group-label">term</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={getters.validTerms.length ? getters.validTerms[getters.validTerms.length - 1][0] : 'sample'}
              name="radio-buttons-group"
            >
              {getters.validTerms.sort().reverse().map((term, key) => (
                <FormControlLabel sx={{padding: '0px 10px' }} onClick={() => setTerm(term)} key={key}  value={term} control={<Radio />} label={term} />
              ))}
            </RadioGroup>
          </FormControl>
          <p className={classes.disclaimer}>Your password and credentials are not stored by either this software or by teaching staff. If you change your UNSW password due to suspected compromise, please email cs6080@cse.unsw.edu.au to inform us as well.</p>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login(zid, zpass, term)}
          >
            Sign in
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="success"
            className={classes.submit}
            onClick={() => window.location.href = config.BASE_NAME}
          >
            Back to homepage
          </Button>
        </form>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
