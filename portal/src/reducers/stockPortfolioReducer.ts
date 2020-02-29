import { UPDATE_WATCHLIST, GET_STOCK_PORTFOLIOS, StockPortfolioActionTypes } from '../actions/stockPortfolioActions';
import { StockPortfolio } from '../models/stockPortfolio';

export interface stockPortfolioState {
    viewing: number, // which portfolio the user is viewing
    stockPortfolios: Array<StockPortfolio>,
}

const initialState: stockPortfolioState = {
    viewing: 0,
    stockPortfolios: []
}

export default (state = initialState, action: StockPortfolioActionTypes) => {
    switch (action.type) {
        case GET_STOCK_PORTFOLIOS:
            return {
                ...state,
                stockPortfolios: [...state.stockPortfolios, ...action.payload]
            }
        default: return state
    }
}