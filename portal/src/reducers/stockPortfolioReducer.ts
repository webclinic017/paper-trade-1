import { UPDATE_WATCHLIST, LOAD_STOCK_PORTFOLIOS, StockPortfolioActionTypes } from '../actions/stockPortfolioActions';
import { IStockPortfolio } from '../models/stockPortfolio';

export interface stockPortfolioState {
    viewing: number, // which portfolio the user is viewing
    stockPortfolios: Array<IStockPortfolio>,
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
        case UPDATE_WATCHLIST:
            return {
                ...state,
                stockPortfolios: [...state.stockPortfolios.filter(s => s.id !== action.payload.id), action.payload]
            }
        default: return state
    }
}