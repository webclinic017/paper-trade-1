import { updateWatchList, getStockPortfolios } from '../services/stockPortfolioService'; 

export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST';
export const GET_STOCK_PORTFOLIOS = 'GET_STOCK_PORTFOLIOS';

interface UpdateWatchListAction {
    type: typeof UPDATE_WATCHLIST,
    payload: Array<string>;
};

interface GetStockPortfoliosAction {
    type: typeof GET_STOCK_PORTFOLIOS,
    payload: any
};

export type StockPortfolioActionTypes = UpdateWatchListAction | GetStockPortfoliosAction;

export const getStockPortfoliosAction = (userId: Number) => (dispatch: any) => {
    return getStockPortfolios(userId).then(res => {
        dispatch({
            type: GET_STOCK_PORTFOLIOS,
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