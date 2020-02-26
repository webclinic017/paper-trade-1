export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST'

interface UpdateWatchListAction {
    type: typeof UPDATE_WATCHLIST,
    payload: Array<string>;
};

export type UserActionTypes = UpdateWatchListAction;

export const updateWatchList = (updatedList: Array<string>) => (dispatch: any) => {
    return dispatch({
        type: UPDATE_WATCHLIST,
        payload: updatedList
    })
};