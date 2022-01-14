import React from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  return (
    <>
     <TextField
        margin="normal"
        required
        fullWidth
        id="fullName"
        label="Full Name"
        name="fullName"
        autoComplete="fullName"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
