import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./Pages/Home";
import Users from "./Pages/Users";
import Layout from "./Components/Layout";
import Post from "./Pages/Post";
import AddPost from "./Pages/AddPost";
import UpdatePost from "./Pages/UpdatePost";
import Posts from "./Pages/Posts";
import UserPosts from "./Pages/UserPosts";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomePage />
          </Layout>
        </Route>
        <Route path="/post/create-new-post" exact>
          <Layout isPrivate={true}>
            <AddPost />
          </Layout>
        </Route>
        <Route path="/post/update-post/:postID" exact>
          <Layout isPrivate={true}>
            <UpdatePost />
          </Layout>
        </Route>
        <Route path="/post/:postID" exact>
          <Layout>
            <Post />
          </Layout>
        </Route>
        <Route path="/users" exact>
          <Layout isPrivate={true}>
            <Users />
          </Layout>
        </Route>
        <Route path="/user/posts/:userID" exact>
          <Layout isPrivate={true}>
            <UserPosts />
          </Layout>
        </Route>
        <Route path="/posts" exact>
          <Layout isPrivate = {true}>
            <Posts />
          </Layout>
        </Route>
        <Route path="/signup">
          <Login isFormSignIn={false} />
        </Route>
        <Route path="/signin">
          <Login isFormSignIn={true} />
        </Route>
        <Route render={() => <Redirect to="/" />} />        
      </Switch>
    </Router>
  );
}

export default App;
