import { getAccessToken } from '../services';

export const AuthActions = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS'
}

export const login = (username: string, password: string) => (dispatch: any) => {
    return getAccessToken(username, password).then(data => {
        // https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
        sessionStorage.setItem('accessToken', data['access']);
        sessionStorage.setItem('refreshToken', data['refresh']);
        dispatch({
            type: AuthActions.LOGIN_SUCCESS
        });
    });
};