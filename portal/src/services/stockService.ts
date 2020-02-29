import { axios } from '.';

export const loadDailyStockData = (symbol: string, date: string) => 
    axios.get(`/daily_stock_data/`, {
        params: { symbol, date }
    });


export const autocomplete = (q : string, cancelToken : any) =>
    axios.get(`/stocks/autocomplete/${q}`, {
        cancelToken: cancelToken 
    });

export const updateWatchList = (watchList: Array<Number>, id: Number) =>
    axios.patch(`/stock_porfolios/${id}/`, {
        properties: watchList
    });
