import { UPDATE_WATCHLIST, UPDATE_VIEWLIST, LOAD_STOCK_PORTFOLIOS, StockPortfolioActionTypes } from '../actions/stockPortfolioActions';
import { IStockPortfolio } from '../models/stockPortfolio';

export interface stockPortfolioState {
    viewing: number, // which portfolio the user is viewing
    stockPortfolios: Array<IStockPortfolio>,
    watchlist: Array<number>,
    viewList: Array<number> // revisit this approach
}

const initialState: stockPortfolioState = {
    viewing: 0,
    stockPortfolios: [],
    watchlist: [],
    viewList: []
}

export default (state = initialState, action: StockPortfolioActionTypes) => {
    switch (action.type) {
        case LOAD_STOCK_PORTFOLIOS:
            return {
                ...state,
                stockPortfolios: action.payload.stockPortfolios,
                watchlist: action.payload.watchlist
            }
        case UPDATE_WATCHLIST:
            return {
                ...state,
                stockPortfolios: [...state.stockPortfolios.filter(s => s.id !== action.payload.id), action.payload]
            }
        case UPDATE_VIEWLIST:
            return {
                ...state,
                viewList: action.payload
            }
        default: return state
    }
}