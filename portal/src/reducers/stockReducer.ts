import { LOAD_DAILY_DATA, StockActionTypes } from '../actions/stockActions';

const initialState = {
    'dailyData': {},
    'currentPrices': {},
    'watchList': []
}

export default (state = initialState, action: StockActionTypes) => {
    switch (action.type) {
        case LOAD_DAILY_DATA:
            return {
                ...state,
                'dailyData': { ...state.dailyData, ...action.payload.dailyData },
                'currentPrices': { 
                    ...state.currentPrices,
                    ...action.payload.currentPrice
                }
            }
        default: return state
    }
}