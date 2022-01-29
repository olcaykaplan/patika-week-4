import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FeaturedPost from "../Components/Posts/FeaturedPost";
import { Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostByUserID } from "../actions/post.action";
import { useParams } from "react-router";

const theme = createTheme();

const UserPosts = () => {
  const userPosts = useSelector(state => state.post).userPosts
  const authUser = useSelector(state => state.auth).user
  let { userID } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostByUserID(userID));
  }, [userID]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Typography variant="h5" gutterBottom textAlign="center" mt={4}>
            User Posts
          </Typography>
         
          <Grid container spacing={5} sx={{ mt: 3 }} justifyContent="space-between">
            {userPosts.map((post, i) => (
              <FeaturedPost key={i} post={post} authUserID={authUser.id}/>
            ))}
          </Grid>  
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default UserPosts;
