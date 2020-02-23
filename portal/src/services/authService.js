import { axios } from '../services';

export const getAccessToken = (username, password) => (
    axios.post('/token/', {
            username: username,
            password: password
        }).then(res => res.data)
        .catch(error => Promise.reject(error))
);

export const validateToken = () => { 
    return axios.get('/users/me/')
        .then(res => res.data)
        .catch(error => Promise.reject(error))
}