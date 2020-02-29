import { Stock } from '../models/stock'; 
import { loadDailyStockData, loadStocks } from '../services/stockService';

export const LOAD_STOCKS = 'LOAD_STOCKS';
export const LOAD_DAILY_DATA = 'LOAD_DAILY_DATA';

export interface LoadDailyDataAction {
    type: typeof LOAD_DAILY_DATA,
    payload: any
}

export interface LoadStocksAction {
    type: typeof LOAD_STOCKS,
    payload: Array<Stock>
}

export type StockActionTypes = LoadDailyDataAction | LoadStocksAction;

export const loadStocksAction = (symbolIds: Array<number>) => (dispatch: any) => {
    return loadStocks(symbolIds).then(res => {
        const stocks: Array<Stock> = res.data;
        const normalizedData: {
            [key: number]: Stock,
        } = {};
        
        stocks.forEach(s => {
            normalizedData[s.id] = s
        });

        dispatch({
            type: LOAD_STOCKS,
            payload: normalizedData
        });

        return stocks;
    });
}

export const loadDailyDataAction = (symbolIds: Array<number>, date: string) => (dispatch: any) => {

    return loadDailyStockData(symbolIds, date)
        .then(res => {
            const data = res.data

            // could have a normalize function here
            if (data.length > 0) {
                const normalizedData = { [data[0].symbol]: data[0] };
                dispatch({
                    type: LOAD_DAILY_DATA,
                    payload: normalizedData
                })
            } 
        
            return data
        });
}