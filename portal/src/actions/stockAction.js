import axios from 'axios';
import { loadDailyStockData } from '../services';

const token = sessionStorage.getItem('accessToken');
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

export const loadDailyDataAction = (symbol, date) => dispatch => {
    return loadDailyStockData(symbol, date)
        .then(res => {
            dispatch({
                type: 'LOAD_DAILY_DATA_ACTION',
                payload: res.data
            })
        }).catch(error => console.log('Failed to fetch daily data'));
}