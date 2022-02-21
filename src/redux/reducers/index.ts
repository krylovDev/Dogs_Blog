/* eslint-disable */
import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import users from "./users";
import comments from "./comments";

const rootReducer = combineReducers({
  posts: posts,
  auth: auth,
  users: users,
  comments: comments,
});

export default rootReducer;
