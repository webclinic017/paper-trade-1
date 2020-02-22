import axios from 'axios';



export const loadDailyDataAction = (symbol, date) => dispatch => {

    axios.get(`http://127.0.0.1:8000/api/v1/stocks/?${date}`)
        .then(res => {
            dispatch({
                type: 'LOAD_DAILY_DATA_ACTION',
                payload: res.data
            })
        }).catch(error => console.log('Failed to fetch daily data'));
}