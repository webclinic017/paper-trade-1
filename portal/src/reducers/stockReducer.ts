import { IStock, IDailyStockData } from '../models/stock';
import { LOAD_STOCKS, LOAD_DAILY_DATA, INITAL_DATA_LOADED, StockActionTypes } from '../actions/stockActions';

export interface StockState {
    dailyData: {
        [key: number]: IDailyStockData
    } ,
    stocks: {
        [key: number]: IStock,
    },
    initialDataLoaded: boolean
}

const initialState: StockState = {
    dailyData: {},
    stocks: {},
    initialDataLoaded: false
}

export default (state = initialState, action: StockActionTypes) => {
    switch (action.type) {
        case LOAD_STOCKS:
            return {
                ...state,
                stocks: { ...state.stocks, ...action.payload }
            }
        case LOAD_DAILY_DATA:
            return {
                ...state,
                dailyData: { ...state.dailyData, ...action.payload }
            }
        case INITAL_DATA_LOADED:
            return {
                ...state,
                initialDataLoaded: true
            }
        default: return state
    }
}