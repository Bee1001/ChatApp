import { combineReducers } from "redux";

import auth from './reducers/auth';
import user from './reducers/user';
import room from './reducers/room';
import message from './reducers/message';

export default combineReducers({ auth, user, room, message });