import { axios } from '../services';

import { validateToken } from '../services';

validateToken().then(res => {
    const token = sessionStorage.getItem('accessToken');
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
}).catch(
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