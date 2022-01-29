import { useDispatch } from "react-redux";
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
import {createPost} from "../actions/post.action"
const AddPost = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
          title: data.get('title'),
          content: data.get('content'),
        };
    dispatch(createPost(postData))    
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={12} xl={12}>
        <Typography variant="h3" textAlign="center" mt={2}>
          Create A New Post
        </Typography>
      </Grid>
      <Grid item xs={11} sm={10} md={8} lg={6} xl={6} mt={3}>
        <Box onSubmit={handleSubmit} component="form">
        <FormGroup>
          <FormControl fullWidth={true} style={{marginBottom: "40px"}}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title"  name="title" aria-describedby="my-helper-text" label="Title" />
          </FormControl>
          <FormControl fullWidth={true}>
            <TextField id="content" name="content" multiline={true} label="Content"  minRows={17} />
          </FormControl>
          <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} >
            <strong>Save</strong>
          </Button>
        </FormGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddPost;
