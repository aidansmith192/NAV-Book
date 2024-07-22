import React, {useRef, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Login = () => {
  const {currentUser, login} = useAuth();
  const emailPhoneRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await login(emailPhoneRef.current.value,
      passwordRef.current.value);
    if (!loggedIn) {
      setError(true);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    // this way a user can't view the login page
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
        height: '400px',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '15px',
      }}>
        <Typography
          variant="h5"
          component="div">
          <strong>Log into NAV Book.</strong>
        </Typography>
        <TextField
          inputProps={{'data-testid': 'email-input'}}
          error={error}
          inputRef={emailPhoneRef}
          id="outlined-basic"
          label="Email / phone number"
          variant="outlined"
          sx={{width: '90%'}}/>
        <TextField
          error={error}
          inputRef={passwordRef}
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          helperText={error && 'Invalid password or username/phone#'}
          sx={{width: '90%'}}/>
        <Button onClick={handleSubmit} variant="contained">Log In</Button>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'cneter',
          alignItems: 'center',
        }}>
          <Button color='success'
            variant="contained"
            onClick={()=>history.push('/register')}>
            Create new account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
