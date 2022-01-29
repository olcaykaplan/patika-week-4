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
import { fetchAllPosts } from "../actions/post.action";

const theme = createTheme();

const Posts = () => {
  const allPosts = useSelector(state => state.post).allPosts
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Typography variant="h5" gutterBottom textAlign="center" mt={4}>
            New Posts
          </Typography>
          
          <Grid container spacing={5} sx={{ mt: 3 }}  justifyContent="space-between">
            {allPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Posts;
