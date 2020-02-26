import { loadDailyStockData } from '../services';

export const StockActions = {
    LOAD_DAILY_DATA_ACTION: 'LOAD_DAILY_DATA_ACTION'
}

export const loadDailyDataAction = (symbol: string, date: string) => (dispatch: any) => {

    return loadDailyStockData(symbol, date)
        .then(res => {
            const data = res.data

            // could have a normalize function here
            if (data.length > 0) {
                const normalizedData = { [data[0].symbol]: data[0] };
                dispatch({
                    type: StockActions.LOAD_DAILY_DATA_ACTION,
                    payload: {
                        dailyData: normalizedData,
                        currentPrice: { [data[0].symbol]: parseFloat(data[0].current_price) }
                    }
                })
            } 
        
            return Promise.resolve(data[0])
        }).catch(error => Promise.reject(error));
}