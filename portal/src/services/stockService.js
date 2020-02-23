import { axios } from '../services';

export const loadDailyStockData = (symbol, date) => 
    axios.get(`/daily_stock_data/`, {
        params: { symbol, date }
    });

