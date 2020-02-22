import { getAccessToken } from '../services';

export const login = (username, password) => dispatch => {
    return getAccessToken(username, password).then(data => {
        sessionStorage.setItem('accessToken', data['access']);
        sessionStorage.setItem('refreshToken', data['refresh']);
        dispatch({
            type: 'LOGIN_SUCCESS'
        });
    });
};