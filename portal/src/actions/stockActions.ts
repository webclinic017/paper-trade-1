import { IStock, IDailyStockData } from '../models/stock'; 
import { loadDailyStockData, loadStocks } from '../services/stockService';

export const LOAD_STOCKS = 'LOAD_STOCKS';
export const LOAD_DAILY_DATA = 'LOAD_DAILY_DATA';
export const INITAL_DATA_LOADED = 'INITAL_DATA_LOADED';

export interface LoadDailyDataAction {
    type: typeof LOAD_DAILY_DATA,
    payload: any
}

export interface LoadStocksAction {
    type: typeof LOAD_STOCKS,
    payload: Array<IStock>
}

export interface InitialDataLoadedAction {
    type: typeof INITAL_DATA_LOADED
}

export type StockActionTypes = LoadDailyDataAction | LoadStocksAction | InitialDataLoadedAction;

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
                const volumeData: Array<Array<number>> = [];

                Object.keys(priceData).forEach(key => {
                    const timestamp = parseFloat(key) * 1000;
                    const open = parseFloat(priceData[key]['1. open']);
                    const high = parseFloat(priceData[key]['2. high']);
                    const low = parseFloat(priceData[key]['3. low']);
                    const close = parseFloat(priceData[key]['4. close']);
                    const volume = parseFloat(priceData[key]['5. volume'])

                    chartData.push([timestamp, open, high, low, close]);
                    volumeData.push([timestamp, volume]);
                });

                dsd.normalizedData = chartData;
                dsd.volumeData = volumeData;
                normalizedData[dsd.symbol] = dsd;
            });

            dispatch({
                type: LOAD_DAILY_DATA,
                payload: normalizedData
            });
                    
            return normalizedData
        });
}

export const initialDataLoadedAction = () => (dispatch: any) => dispatch({ type: INITAL_DATA_LOADED });