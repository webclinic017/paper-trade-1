const initialState = {
    'dailyData': {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DAILY_DATA_ACTION':
            return {
                ...state,
                'dailyData': { ...state.dailyData, ...action.payload }
            }
        default: return state
    }
}