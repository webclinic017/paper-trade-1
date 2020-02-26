import { loadDailyStockData } from '../services';

export const LOAD_DAILY_DATA = 'LOAD_DAILY_DATA';

export interface LoadDailyDataAction {
    type: typeof LOAD_DAILY_DATA,
    payload: any
}
export type StockActionTypes = LoadDailyDataAction;

export const loadDailyDataAction = (symbol: string, date: string) => (dispatch: any) => {

    return loadDailyStockData(symbol, date)
        .then(res => {
            const data = res.data

            // could have a normalize function here
            if (data.length > 0) {
                const normalizedData = { [data[0].symbol]: data[0] };
                dispatch({
                    type: LOAD_DAILY_DATA,
                    payload: {
                        dailyData: normalizedData,
                        currentPrice: { [data[0].symbol]: parseFloat(data[0].current_price) }
                    }
                })
            } 
        
            return Promise.resolve(data[0])
        }).catch(error => Promise.reject(error));
}