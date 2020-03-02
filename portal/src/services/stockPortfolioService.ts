import { axios } from '.';

export const loadStockPortfolios = (userId: Number) => 
    axios.get('/stock_portfolios/', {
        params: {
            user: userId
        }
    });

export const updateWatchList = (watchList: Array<Number>, id: Number) =>
    axios.patch(`/stock_portfolios/${id}/`, {
        properties: {
            watch_list: watchList
        }
    });
