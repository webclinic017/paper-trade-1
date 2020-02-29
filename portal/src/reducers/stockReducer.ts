import { LOAD_DAILY_DATA, StockActionTypes } from '../actions/stockActions';

export interface StockState {
    'dailyData': Object,
    'stockInfo': Object
}

const initialState: StockState = {
    'dailyData': {},
    'stockInfo': {}
}

export default (state = initialState, action: StockActionTypes) => {
    switch (action.type) {
        case LOAD_DAILY_DATA:
            return {
                ...state,
                'dailyData': { ...state.dailyData, ...action.payload.dailyData }
            }
        default: return state
    }
}