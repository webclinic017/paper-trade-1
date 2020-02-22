const initialState = {
    'stocks': []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DAILY_DATA_ACTION':
            return {
                ...state,
                'stocks': []
            }
        default: return state
    }
}