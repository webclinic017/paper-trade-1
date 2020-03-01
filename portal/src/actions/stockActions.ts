import { IStock, IDailyStockData } from '../models/stock'; 
import { loadDailyStockData, loadStocks } from '../services/stockService';

export const LOAD_STOCKS = 'LOAD_STOCKS';
export const LOAD_DAILY_DATA = 'LOAD_DAILY_DATA';

export interface LoadDailyDataAction {
    type: typeof LOAD_DAILY_DATA,
    payload: any
}

export interface LoadStocksAction {
    type: typeof LOAD_STOCKS,
    payload: Array<IStock>
}

export type StockActionTypes = LoadDailyDataAction | LoadStocksAction;

export const loadStocksAction = (symbolIds: Array<number>) => (dispatch: any) => {
    return loadStocks(symbolIds).then(res => {
        const stocks: Array<IStock> = res.data;
        const normalizedData: {
            [key: number]: IStock,
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
            const data: Array<IDailyStockData> = res.data
            const normalizedData: { [key: number]: IDailyStockData }= {};

            data.forEach(dsd => {
                const priceData: {
                    [key: string]: { [key: string] : string },
                } = dsd.price_data;

                const chartData: Array<Array<number>> = [];


                Object.keys(priceData).forEach(key => {
                    const timestamp = parseFloat(key) * 1000;
                    const open = parseFloat(priceData[key]['1. open']);
                    const high = parseFloat(priceData[key]['2. high']);
                    const low = parseFloat(priceData[key]['3. low']);
                    const close = parseFloat(priceData[key]['4. close']);

                    chartData.push([timestamp, open, high, low, close]);
                });

                dsd.normalizedData = chartData;
                normalizedData[dsd.symbol] = dsd;
            });

            dispatch({
                type: LOAD_DAILY_DATA,
                payload: normalizedData
            });
                    
            return normalizedData
        });
}