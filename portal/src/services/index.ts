import { axiosClient } from './axiosClient';
import { getAccessToken, removeAccessTokens } from './authService';
import { autocomplete, loadDailyStockData } from './stockService';
import { updateWatchlist } from './stockPortfolioService';

export { 
    axiosClient as axios,
    autocomplete,
    getAccessToken,
    loadDailyStockData,
    removeAccessTokens,
    updateWatchlist,
};

