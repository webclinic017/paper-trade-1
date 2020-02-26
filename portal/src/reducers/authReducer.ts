import { validateToken } from '../services';
import { LOGIN_SUCCESS, AuthActionTypes } from '../actions/authActions';

/** Removes stale tokens from session storage */
validateToken().then(res => res).catch(
    error => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }
);

const initialState = {
    'loggedIn': sessionStorage.getItem('accessToken') !== null
}

export default (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true
            }
        default: return state
    }
}