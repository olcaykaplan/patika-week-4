import { combineReducers } from 'redux';
import auth from './auth.js';
import userAction from './userAction.js';

export default combineReducers({ auth, userAction });
