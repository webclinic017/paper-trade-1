
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import stockReducer from './stockReducer';
import stockPortfolioReducer from './stockPorfolioReducer';

export default combineReducers({
    authReducer,
    stockReducer,
    stockPortfolioReducer
});