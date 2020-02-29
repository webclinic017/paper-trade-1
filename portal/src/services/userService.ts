import { axios } from '.';

/** Gets current user, also checks that an access token is still valid by making a request */
export const getCurrentUser = () : Promise<any> => { 
    return axios.get('/users/me/')
        .then(res => res.data)
        .catch(error => Promise.reject(error))
}