import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  TextField,
} from "@mui/material";
import {updatePost, fetchPostByID} from "../actions/post.action"
import { useEffect } from "react";
const UpdatePost = ({}) => {
  const dispatch = useDispatch()
  const {post}  = useSelector((state) => state.post);
  const {postID} = useParams()
  const handleSubmit = (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
          title: data.get('title'),
          content: data.get('content'),
        };
    dispatch(updatePost(postData))    
  }
  useEffect(() => {
      console.log()
      dispatch(fetchPostByID(postID))
  }, [postID])
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={12} xl={12}>
        <Typography variant="h3" textAlign="center" mt={2}>
          Update The Post
        </Typography>
      </Grid>
      <Grid item xs={11} sm={10} md={8} lg={6} xl={6} mt={3}>
        <Box onSubmit={handleSubmit} component="form">
        <FormGroup>
          <FormControl fullWidth={true} style={{marginBottom: "40px"}}>
            <Input id="title"  name="title" aria-describedby="my-helper-text" label="Title" defaultValue={post.title}/>
          </FormControl>
          <FormControl fullWidth={true}>
            <TextField id="content" name="content" multiline={true} label="Content"  minRows={17}  defaultValue={post.content}/>
          </FormControl>
          <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} >
            <strong>Save Changes</strong>
          </Button>
        </FormGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpdatePost;
