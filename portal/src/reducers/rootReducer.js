
import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import authReducer from './authReducer';

export default combineReducers({
    stockReducer,
    authReducer
});