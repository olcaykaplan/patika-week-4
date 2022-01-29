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
import { fetchPostByID } from "../actions/post.action";
import { useParams } from "react-router";

const theme = createTheme();

const Post = () => {
  const { post, featuredPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  let { postID } = useParams();
  useEffect(() => {
    dispatch(fetchPostByID(postID));
  }, [postID]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Typography variant="h5" gutterBottom textAlign="center" mt={4}>
            New Posts
          </Typography>
          <Grid container justifyContent="space-around">
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                "& .markdown": {
                  py: 3,
                },
              }}
            >
              <Typography variant="h4" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="subtitle1">
                {Date(post.createdAt)}
              </Typography>
              <Divider />
              {<p className="markdown">{post?.content}</p>}
            </Grid>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Post;
