import { updateWatchList } from '../services' 

export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST'

interface UpdateWatchListAction {
    type: typeof UPDATE_WATCHLIST,
    payload: Array<string>;
};

export type StockPortfolioActionTypes = UpdateWatchListAction;

export const updateWatchListAction = (updatedList: Array<string>) => (dispatch: any) => {
    updateWatchList([123], 1);
    return dispatch({
        type: UPDATE_WATCHLIST,
        payload: updatedList
    })
};