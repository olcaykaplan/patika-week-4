import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Avatar,
  Tooltip,
  IconButton,
  CardActions,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import {deletePost} from "../../actions/post.action";
import {useDispatch} from 'react-redux'
function FeaturedPost({ post, authUserID }) {
  const { title, createdAt, content, author, id } = post;
  const date = createdAt.split("T")[0];
  const dispatch = useDispatch()
  const deleteHandle = (id) => {
    dispatch(deletePost(id));
  };
  return (
    <Grid item xs={12} md={5}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle2">{date}</Typography>
            <Typography variant="subtitle1" paragraph>
              {content.substring(0, 55)}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" color="primary">
                <Link to={`/post/${id}`}>Continue reading...</Link>
              </Typography>

              <Link
                to={`/user/posts/${author.id}`}
                style={{ textDecoration: "none" }}
              >
                <Tooltip title={author.fullName} arrow>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {author.fullName.substring(0, 1).toUpperCase()}
                  </Avatar>
                </Tooltip>
              </Link>
            </Box>
            {authUserID == author.id ? (
              <CardActions>
                <IconButton onClick={() => deleteHandle(id)}>
                  <Delete />
                </IconButton>
                <IconButton>
                  <Link to={`/post/update-post/${id}`} style={{color:'#757575'}}><Edit /></Link>
                </IconButton>
              </CardActions>
            ) : null}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;
