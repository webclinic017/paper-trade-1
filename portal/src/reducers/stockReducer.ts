import { Stock, DailyStockData } from '../models/stock';
import { LOAD_STOCKS, LOAD_DAILY_DATA, StockActionTypes } from '../actions/stockActions';

export interface StockState {
    'dailyData': {
        [key: number]: DailyStockData
    } ,
    'stocks': {
        [key: number]: Stock,
    }
}

const initialState: StockState = {
    'dailyData': {},
    'stocks': {}
}

export default (state = initialState, action: StockActionTypes) => {
    switch (action.type) {
        case LOAD_STOCKS:
            return {
                ...state,
                'stocks': { ...state.stocks, ...action.payload }
            }
        case LOAD_DAILY_DATA:
            return {
                ...state,
                'dailyData': { ...state.dailyData, ...action.payload }
            }
        default: return state
    }
}