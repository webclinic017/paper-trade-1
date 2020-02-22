import axios from 'axios';

export const loadDailyStockData = (symbol, date) => 
    axios.get(`http://127.0.0.1:8000/api/v1/stocks/?symbol=${symbol}&date=${date}`)

