import { validateToken } from '../services';

validateToken().then(res => res).catch(
    error => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }
);

const initialState = {
    'loggedIn': sessionStorage.getItem('accessToken') !== null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggedIn: true
            }
        default: return state
    }
}