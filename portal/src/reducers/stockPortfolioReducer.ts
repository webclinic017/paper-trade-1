import { UPDATE_WATCHLIST, LOAD_STOCK_PORTFOLIOS, StockPortfolioActionTypes } from '../actions/stockPortfolioActions';
import { StockPortfolio } from '../models/stockPortfolio';

export interface stockPortfolioState {
    viewing: number, // which portfolio the user is viewing
    stockPortfolios: Array<StockPortfolio>,
    watchList: Array<number>
}

const initialState: stockPortfolioState = {
    viewing: 0,
    stockPortfolios: [],
    watchList: []
}

export default (state = initialState, action: StockPortfolioActionTypes) => {
    switch (action.type) {
        case LOAD_STOCK_PORTFOLIOS:
            return {
                ...state,
                stockPortfolios: action.payload.stockPortfolios,
                watchList: action.payload.watchList
            }
        default: return state
    }
}