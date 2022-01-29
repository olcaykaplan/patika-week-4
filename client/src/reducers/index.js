import { combineReducers } from 'redux';
import auth from './auth.js';
import userAction from './userAction.js';
import post from './post.js';

export default combineReducers({ auth, userAction, post });
