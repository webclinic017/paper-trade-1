import { UPDATE_WATCHLIST, StockPortfolioActionTypes } from '../actions/stockPortfolioActions';

export interface stockPortfolioState {
    'watchList': Array<Number>
}

const initialState: stockPortfolioState = {
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