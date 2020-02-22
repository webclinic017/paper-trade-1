const initialState = {
    'loggedIn': false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggedIn: true,
                bob: 'wtf'
            }
        default: return state
    }
}