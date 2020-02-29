
import { combineReducers } from 'redux';

import authReducer, { authState } from './authReducer';
import stockReducer, { StockState } from './stockReducer';
import stockPortfolioReducer, { stockPortfolioState } from './stockPorfolioReducer';
import userReducer, { userState } from './userReducer';

export interface AppState {
    'authReducer': authState,
    'stockReducer': StockState,
    'stockPortfolioReducer': stockPortfolioState,
    'userReducer': userState
}

export default combineReducers({
    authReducer,
    stockReducer,
    stockPortfolioReducer,
    userReducer
});