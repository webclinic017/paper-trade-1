import { axios } from '.';

export const removeAccessTokens = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
}

/** Gets the access token with the given username and password */
export const getAccessToken = (username: string, password: string) : Promise<any> => (
    axios.post('/token/', {
            username: username,
            password: password
        }).then(res => res.data)
        .catch(error => Promise.reject(error))
);

/** Checks that an access token is still valid by making a request */
export const validateToken = () : Promise<any> => { 
    return axios.get('/users/me/')
        .then(res => res.data)
        .catch(error => Promise.reject(error))
}