import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../actions/authAction";
import { Route, Redirect } from "react-router-dom";

const Layout = ({ children, isPrivate }) => {
  const isAuthenticated  = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // if page is private then check person has login. if user not login redirect home page
  // if page is not private then let show
  const checkPermission = isPrivate ? (isAuthenticated ? true : false) : true;
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return checkPermission ? (
    <Grid container>
      <Header />
      <Grid style={{ minHeight: "85vh", minWidth: "100vw" }}>{children}</Grid>
      <Footer />
    </Grid>
  ) : (
    <Route render={() => <Redirect to="/" />} />
  );
};

export default Layout;

