import axios from 'axios';

export const getAccessToken = (username, password) => (
    axios.post('http://127.0.0.1:8000/api/v1/token/', {
            username: username,
            password: password
        }).then(res => res.data)
        .catch(error => console.log('Failed to login'))
);

export const validateToken = () => { 
    const token = sessionStorage.getItem('accessToken');

    return axios.get('http://127.0.0.1:8000/api/v1/users/me/', {
         headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(res => res.data)
        .catch(error => Promise.reject())
}