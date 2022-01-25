import axios from "axios";
const url = 'http://localhost:5000/api';

const API = axios.create({ baseURL: url, withCredentials:true });

export const signIn = (signInForm) => API.post("/signin", signInForm);
export const signUp = (signUpForm) => API.post("/signup", signUpForm);
export const logout = () => API.get("/logout");
export const fetchUser = () => API.get("/user-auth");
export const getUsers = () => API.get("/users" );

