import { IStockPortfolio } from '../models/stockPortfolio';
import { updateWatchList, loadStockPortfolios } from '../services/stockPortfolioService'; 

export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST';
export const UPDATE_VIEWLIST = 'UPDATE_VIEWLIST';
export const LOAD_STOCK_PORTFOLIOS = 'GET_STOCK_PORTFOLIOS';

interface UpdateWatchListAction {
    type: typeof UPDATE_WATCHLIST,
    payload: IStockPortfolio;
}

interface LoadStockPortfoliosAction {
    type: typeof LOAD_STOCK_PORTFOLIOS,
    payload: { 
        stockPortfolios: Array<IStockPortfolio>,
        watchList: Array<number>
    }
}

interface UpdateViewListAction {
    type: typeof UPDATE_VIEWLIST,
    payload: Array<number>;
}

export type StockPortfolioActionTypes = UpdateWatchListAction | LoadStockPortfoliosAction | UpdateViewListAction;

export const loadStockPortfoliosAction = (userId: Number) => (dispatch: any) => {
    return loadStockPortfolios(userId).then(res => {
        
        const stockPortfolios: Array<IStockPortfolio> = res.data;
        const watchList = new Set<number>();

        stockPortfolios.forEach(p => {
            p.stockposition_set.forEach(sp => watchList.add(sp.stock));
            p.properties.watch_list.forEach(s => watchList.add(s));
        });
    
        dispatch({
            type: LOAD_STOCK_PORTFOLIOS,
            payload: {
                stockPortfolios: res.data,
                watchList: Array.from(watchList)
            }
        });
        
        return res.data
    });
};

export const updateWatchListAction = (updatedList: Array<number>, portfolioId: number) => (dispatch: any) => {
    return updateWatchList(updatedList, portfolioId).then(
        res => {
            dispatch({
                type: UPDATE_WATCHLIST,
                payload: res.data
            });

            return res.data
        }
    );
};

export const updateViewListAction = (updatedList: Array<number>) => (dispatch: any) => {
    dispatch({
        type: UPDATE_VIEWLIST,
        payload: updatedList
    });

    return updatedList;
}