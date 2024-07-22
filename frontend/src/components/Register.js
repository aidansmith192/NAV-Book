import React, {useRef, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const Register = (props) => {
  const {classes} = props;
  const {currentUser, register} = useAuth();
  const phoneRef = useRef();
  const emailRef = useRef();
  const firstRef = useRef();
  const lastRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorText('');

    if (passwordRef.current.value !==
      passwordConfirmRef.current.value) {
      setError('passwordMismatch');
      setErrorText('Passwords do not match.');
      return;
    }

    if (!Number(phoneRef.current.value)) {
      setError('badPhoneNumber');
      setErrorText('Invalid phone number.');
      return;
    }

    const registered = await register({
      phoneNumber: phoneRef.current.value,
      email: emailRef.current.value,
      firstName: firstRef.current.value,
      lastName: lastRef.current.value,
      password: passwordRef.current.value,
    });


    if (registered === 'badEmail') {
      setError('badEmail');
      setErrorText('Invalid email.');
      return;
    }

    if (registered === 'emailTaken') {
      setError('emailTaken');
      setErrorText('That email is already in use.');
      return;
    }

    if (registered === 'phoneNumberTaken') {
      setError('phoneNumberTaken');
      setErrorText('That phone number is already in use.');
      return;
    }

    history.push('/');
  };

  useEffect(() => {
    // this way a user can't view the register page
    // if they are already logged in
    if (currentUser) {
      history.push('/');
    }
  });

  return (
    <Container maxWidth="lg" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      color: '#5393ff',
      fontFamily:
        'system-ui, applesystem, BlinkMacSystemFont, sans - serif',
    }}>
      <Typography
        fontWeight="bold"
        color="#5393ff"
        variant="h3"
        noWrap
        component="div"
        sx={{marginTop: '10px'}}
      >
        NAV Book
      </Typography>
      <Paper elevation={3} sx={{
        height: '500px',
        minWidth: '350px',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '15px',
      }}>
        <form
          className={classes.container}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Typography
            variant="h5"
            component="div">
            <strong>
              Create an account.
            </strong>
          </Typography>
          <Typography
            variant="subtitle1"
            component="div">
              It's quick and easy.
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%'}}>
            <TextField
              inputProps={{'data-testid': 'first-input'}}
              inputRef={firstRef}
              id="outlined-basic"
              label="First Name"
              required
              variant="outlined"
              sx={{width: '45%'}} />
            <TextField
              inputProps={{'data-testid': 'last-input'}}
              inputRef={lastRef}
              id="outlined-basic"
              label="Last Name"
              required
              variant="outlined"
              sx={{width: '45%'}} />
          </Box>
          <TextField
            inputProps={{'data-testid': 'number-input'}}
            error={error === 'phoneNumberTaken' ||
              error === 'badPhoneNumber'}
            inputRef={phoneRef}
            id="outlined-basic"
            label="Phone Number"
            required
            variant="outlined"
            helperText={(error === 'phoneNumberTaken' ||
              error === 'badPhoneNumber') &&
              errorText}
            sx={{width: '90%'}} />
          <TextField
            inputProps={{'data-testid': 'email-input'}}
            error={error === 'emailTaken' || error === 'badEmail'}
            inputRef={emailRef}
            id="outlined-basic"
            label="Email"
            required
            variant="outlined"
            helperText={(error === 'emailTaken' ||
              error === 'badEmail') &&
              errorText}
            sx={{width: '90%'}} />
          <TextField
            inputProps={{'data-testid': 'password-input'}}
            error={error === 'passwordMismatch'}
            inputRef={passwordRef}
            id="outlined-basic"
            label="Password"
            type="password"
            required
            variant="outlined"
            sx={{width: '90%'}} />
          <TextField
            inputProps={{'data-testid': 'confirm-input'}}
            error={error === 'passwordMismatch'}
            inputRef={passwordConfirmRef}
            id="outlined-basic"
            label="Confirm password"
            type="password"
            required
            variant="outlined"
            helperText={error === 'passwordMismatch' &&
              errorText}
            sx={{width: '90%'}} />
          <Button type="submit" variant="contained">Sign Up</Button>
        </form>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'cneter',
          alignItems: 'center',
        }}>
          <Link to='/login'>Already have an account?</Link>
        </Box>
      </Paper>
    </Container>
  );
};


Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
