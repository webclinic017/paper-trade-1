
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import stockReducer from './stockReducer';
import userReducer from './userReducer';

export default combineReducers({
    authReducer,
    stockReducer,
    userReducer
});