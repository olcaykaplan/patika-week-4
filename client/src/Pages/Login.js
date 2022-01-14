import React, { useState, useEffect } from 'react';
import {
  Avatar,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  Link,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  Route, Redirect } from 'react-router-dom'

import SignIn from '../Components/Login/SignIn';
import Signup from '../Components/Login/Signup';
import { signup, signin, fetchUser } from '../actions/authAction';

const theme = createTheme();

export default function SignInSide({ isFormSignIn }) {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(isFormSignIn);
  const isAuthenticated = useSelector((state) => state.auth).isAuthenticated;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = isSignIn
      ? {
          email: data.get('email'),
          password: data.get('password'),
        }
      : {
          fullName: data.get('fullName'),
          email: data.get('email'),
          password: data.get('password'),
          confirmPassword: data.get('confirmPassword'),
        };
    if (isSignIn) {
      dispatch(signin(formData));
    } else {
      dispatch(signup(formData));
    }
  };
  
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return isAuthenticated ? <Route render={() => <Redirect to="/" />} /> :(
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignIn ? 'Sign in' : 'Singup'}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              autocomplete="off"
              textAlign="center"
            >
              {isSignIn ? <SignIn /> : <Signup />}
              <Link to="/" variant="body2" style={{ textDecoration: 'none' }}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Return Homepage
                </Button>
              </Link>
              <Grid container>
                <Grid item>
                  <Link href={isSignIn ? '/signup' : '/signin'} variant="body2">
                    {isSignIn
                      ? "Don't have an account? Sign Up"
                      : 'Already have an account? Sing In'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
