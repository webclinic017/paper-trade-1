import axios from 'axios';

import { getAccessToken, validateToken } from './authService';
import { loadDailyStockData } from './stockService';

export { 
    axiosClient as axios,
    getAccessToken,
    validateToken,
    loadDailyStockData
};


/** Wraps axios to include auth header for requests  */
const axiosClient = (() => {
    const defaultOptions = {
        baseURL: 'http://127.0.0.1:8000/api/v1',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use((config) =>{
        const token = sessionStorage.getItem('accessToken');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
})();

