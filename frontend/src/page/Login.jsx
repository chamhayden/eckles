import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import mainlogo from '../asset/mainlogo.png';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import AppLoad from '../component/AppLoad';
import { apiCall } from '../util/api';
import config from '../config';
import makePage from '../component/makePage';
import { Context, useContext } from '../context';

/* Sourced https://github.com/mui-org/material-ui/blob/v3.x/docs/src/pages/getting-started/page-layout-examples/sign-in/SignIn.js */
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
    marginTop: theme.spacing.unit * 3,
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
  const { getters, setters } = useContext(Context);
  const [zid, setZid] = React.useState('');
  const [zpass, setZpass] = React.useState('');
  const [term, setTerm] = React.useState(['sample']);
  const [cookies, setCookie] = useCookies();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

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
    apiCall('login', { term, zid, zpass })
      .then(_ => {
        localStorage.removeItem('eckles_content');
        localStorage.removeItem('eckles_expiry');
        window.location.href = `/${term}`
      })
      .finally(_ => setLoading(false));
  }

  const { classes } = props;

  if (loading) {
    return <AppLoad />;
  }
  
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <img className={classes.logo} src={mainlogo} />
        <Typography component="h1" variant="h5">
          Sign in to COMP6080
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">zid</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus placeholder="z1234567" value={zid} onChange={e => setZid(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">zpass</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={zpass} onChange={e => setZpass(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ marginTop: '15px', marginBottom: '5px' }} id="demo-radio-buttons-group-label">term</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={getters.validTerms[0]}
              name="radio-buttons-group"
            >
              {getters.validTerms.map((term, key) => (
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
            onClick={() => window.location.href = '/'}
          >
            Back to homepage
          </Button>
        </form>
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);