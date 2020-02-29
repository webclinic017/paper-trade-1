import { updateWatchList, loadStockPortfolios } from '../services/stockPortfolioService'; 

export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST';
export const LOAD_STOCK_PORTFOLIOS = 'GET_STOCK_PORTFOLIOS';

interface UpdateWatchListAction {
    type: typeof UPDATE_WATCHLIST,
    payload: Array<string>;
};

interface LoadStockPortfoliosAction {
    type: typeof LOAD_STOCK_PORTFOLIOS,
    payload: any
};

export type StockPortfolioActionTypes = UpdateWatchListAction | LoadStockPortfoliosAction;

export const loadStockPortfoliosAction = (userId: Number) => (dispatch: any) => {
    return loadStockPortfolios(userId).then(res => {
        dispatch({
            type: LOAD_STOCK_PORTFOLIOS,
            payload: res.data
        });
        return res.data
    });
}

export const updateWatchListAction = (updatedList: Array<string>) => (dispatch: any) => {
    return updateWatchList([123], 1).then(
        res => {
            return dispatch({
                type: UPDATE_WATCHLIST,
                payload: updatedList
            });
        }
    );
};