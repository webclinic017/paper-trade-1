const initialState = {
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DAILY_DATA_ACTION':
            return {
                ...state,
                'bob': action.payload
            }
        default: return state
    }
}