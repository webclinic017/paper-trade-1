import { getAccessToken } from '../services';

export const login = (username, password) => dispatch => {
    return getAccessToken(username, password).then(data => {
        // https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
        sessionStorage.setItem('accessToken', data['access']);
        sessionStorage.setItem('refreshToken', data['refresh']);
        dispatch({
            type: 'LOGIN_SUCCESS'
        });
    });
};