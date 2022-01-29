import {CREATE_POST, DELETE_POST, UPDATE_POST, FETCH_POST_BY_ID, FETCH_ALL_POSTS, FETCH_POST_BY_UserID } from "../utils/constant";

var DEFAULT_STATE = {
  allPosts: [],
  userPosts: [],
  post: {},
  featuredPosts: []  
};

const userActionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,        
      };
      case FETCH_POST_BY_ID:
        return{
          ...state,
          post: action.data.post,
          featuredPosts: action.data.featuredPosts
        }
      case FETCH_POST_BY_UserID:
        return{
          ...state,
          userPosts: action.data.userPosts
        }
        case FETCH_ALL_POSTS:
          return{
            ...state,
            allPosts: action.data
          }
    default:
      return state;
  }
};
export default userActionReducer;
