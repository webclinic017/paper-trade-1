import { axios } from '.';

export const loadStockPortfolios = (userId: Number) => 
    axios.get('/stock_portfolios/', {
        params: {
            user: 2
        }
    });

export const updateWatchList = (watchList: Array<Number>, id: Number) =>
    axios.patch(`/stock_porfolios/${id}/`, {
        properties: { 'watch_list': watchList }
    });
