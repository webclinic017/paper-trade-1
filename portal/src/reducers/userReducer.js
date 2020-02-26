const initialState = {
    'watchList': []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_WATCHLIST':
            return {
                ...state,
                watchList: action.payload
            }
        default: return state
    }
}