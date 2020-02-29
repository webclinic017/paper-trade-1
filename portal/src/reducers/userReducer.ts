
import { GET_CURRENT_USER, UserActionTypes } from '../actions/userActions';

export interface userState {
    'id': Number,
    'username': string,
    'first_name': string,
    'last_name': string
}

const initialState: userState = {
    'id': -1,
    'username': '',
    'first_name': '',
    'last_name': ''
}

export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                ...state,
                ...action.payload,
            }
        default: return state
    }
}