import { axios } from '../services';

export const loadDailyStockData = (symbol, date) => 
    axios.get(`/daily_stock_data/`, {
        params: { symbol, date }
    });


export const autocomplete = (q, cancelToken) => {
    return axios.get(`/stocks/autocomplete/${q}`, {
        cancelToken: cancelToken 
    });
}