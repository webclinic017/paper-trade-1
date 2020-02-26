export const updateWatchList = (updatedList) => dispatch => {
    return dispatch({
        type: 'UPDATE_WATCHLIST',
        payload: updatedList
    })
};