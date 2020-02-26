export const updateWatchList = (updatedList: Array<string>) => (dispatch: any) => {
    return dispatch({
        type: 'UPDATE_WATCHLIST',
        payload: updatedList
    })
};