import React, { useEffect } from "react";
import { Grid } from '@mui/material';
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../actions/authAction";


const Layout = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchUser());
    }, []);
    return(
  <Grid
    container  
    justify="center"
  >
    <Header/>
    {children}
        <Footer />
  </Grid>
)};

export default Layout;