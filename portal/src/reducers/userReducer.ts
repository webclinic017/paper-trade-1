import { UPDATE_WATCHLIST, UserActionTypes } from '../actions/userActions';

const initialState = {
    'watchList': []
}

export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case UPDATE_WATCHLIST:
            return {
                ...state,
                watchList: action.payload
            }
        default: return state
    }
}