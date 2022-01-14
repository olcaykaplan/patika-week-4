import axios from "axios";
const url = 'http://localhost:5000';

const API = axios.create({ baseURL: url, withCredentials:true });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });

export const signIn = (signInForm) => API.post("/signin", signInForm);
export const signUp = (signUpForm) => API.post("/signup", signUpForm);
export const logout = () => API.get("/logout");
export const fetchUser = () => API.get("/user-auth");
export const getUsers = () => API.get("/users" );

