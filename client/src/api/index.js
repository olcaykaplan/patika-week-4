import axios from "axios";
const url = 'http://localhost:5000/api';

const API = axios.create({ baseURL: url, withCredentials:true });


//AUTH
export const signIn = (signInForm) => API.post("/signin", signInForm);
export const signUp = (signUpForm) => API.post("/signup", signUpForm);
export const logout = () => API.get("/logout");
export const fetchUser = () => API.get("/user-auth");
export const getUsers = () => API.get("/users" );


//POSTS
export const createPost = (post) => API.post('/post',post)
export const deletePost = (id) => API.delete(`/post/${id}`)
export const updatePost = (id, post) => API.put(`/post/${id}`,post)

export const fetchPostByID = (id) => API.get(`/post/${id}`)
export const fetchPostByUserID = (id) => API.get(`/user/post/${id}`)
export const fetchAllPosts = () => API.get('/posts',)
