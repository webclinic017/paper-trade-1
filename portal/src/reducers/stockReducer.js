const initialState = {
    'dailyData': {},
    'currentPrices': {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DAILY_DATA_ACTION':
            return {
                ...state,
                'dailyData': { ...state.dailyData, ...action.payload.dailyData },
                'currentPrices': { 
                    ...state.currentPrices,
                    ...action.payload.currentPrice
                }
            }
        default: return state
    }
}