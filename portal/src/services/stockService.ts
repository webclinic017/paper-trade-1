import { axios } from '.';

export const loadStocks = (symbolIds: Array<number>) => {
    const ids = symbolIds.join('|');
    return axios.get('/stocks/', {
        params: { id: ids }
    });
}

export const loadDailyStockData = (symbolIds: Array<number>, date: string, firstLoad: boolean=false) => {
    const ids = symbolIds.join('|');

    return axios.get(`/daily_stock_data/`, {
        params: { symbol: ids, date, firstLoad }
    });
}


export const autocomplete = (q : string, cancelToken : any) =>
    axios.get(`/stocks/autocomplete/${q}`, {
        cancelToken: cancelToken,
        headers: { 'Cache-Control': 'no-cache, no-store' }
    });
