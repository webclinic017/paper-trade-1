import { axios } from '../services';

export const getAccessToken = (username, password) => (
    axios.post('/token/', {
            username: username,
            password: password
        }).then(res => res.data)
        .catch(error => console.log('Failed to login'))
);

export const validateToken = () => { 
    const token = sessionStorage.getItem('accessToken');

    return axios.get('/users/me/', {
         headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(res => res.data)
        .catch(error => Promise.reject())
}