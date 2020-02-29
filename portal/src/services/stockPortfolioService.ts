import { axios } from '.';

export const updateWatchList = (watchList: Array<Number>, id: Number) =>
    axios.patch(`/stock_porfolios/${id}/`, {
        properties: watchList
    });
