import { loadDailyStockData } from '../services';

export const loadDailyDataAction = (symbol, date) => dispatch => {

    return loadDailyStockData(symbol, date)
        .then(res => {
            const data = res.data

            // could have a normalize function here
            if (data.length > 0) {
                const normalizedData = { [data[0].symbol]: data[0] };
                dispatch({
                    type: 'LOAD_DAILY_DATA_ACTION',
                    payload: normalizedData
                })
            } 
        
            return Promise.resolve(data[0])
        }).catch(error => console.log('Failed to fetch daily data'));
}