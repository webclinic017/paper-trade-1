import { StockPortfolio } from '../models/stockPortfolio';
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
        
        const stockPortfolios: Array<StockPortfolio> = res.data;
        let watchList: Array<number> = []
        stockPortfolios.forEach(sp => {
            watchList = watchList.concat(sp.properties.watch_list);
        })
    
        dispatch({
            type: LOAD_STOCK_PORTFOLIOS,
            payload: {
                stockPortfolios: res.data,
                watchList
            }
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