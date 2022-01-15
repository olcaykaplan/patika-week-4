import {
    AUTH,
    LOGOUT,
    LOGIN_ERROR,
    REGISTER_ERROR,
  } from "../utils/constant";
  
  var DEFAULT_STATE = {
        isAuthenticated:false,
        fullName:'',
        errorMessage: ''
  }

  const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case AUTH:
        localStorage.setItem("userInfo", JSON.stringify({fullName:action.data.user ? action.data.user: null,isAuthenticated: action.data.user ? true : false }));
      return {
        ...state, 
        isAuthenticated: action.data.user && true,
        fullName: action.data.user && action.data.user
      }
      case LOGOUT:
        localStorage.clear();
        window.location.replace('/')
         return state;
      case LOGIN_ERROR:
        localStorage.clear();
         return {
           ...state,
           isAuthenticated:false,
           errorMessage: action.data.message
          };
      case REGISTER_ERROR:
        localStorage.clear();
         return state;
      default:
        return state;
    }
  };
  export default authReducer;
  