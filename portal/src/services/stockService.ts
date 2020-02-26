import { axios } from '.';

export const loadDailyStockData = (symbol: string, date: string) => 
    axios.get(`/daily_stock_data/`, {
        params: { symbol, date }
    });


export const autocomplete = (q : string, cancelToken : any) => {
    return axios.get(`/stocks/autocomplete/${q}`, {
        cancelToken: cancelToken 
    });
}