import { UPDATE_WATCHLIST, StockPortfolioActionTypes } from '../actions/stockPortfolioActions';

const initialState = {
    'watchList': []
}

export default (state = initialState, action: StockPortfolioActionTypes) => {
    switch (action.type) {
        case UPDATE_WATCHLIST:
            return {
                ...state,
                watchList: action.payload
            }
        default: return state
    }
}