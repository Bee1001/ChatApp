import * as types from '../types';

let initialState = {
    token: localStorage.getItem('userToken'),
    isAuthenticated: false,
    loading: false,
    error: null
}

const auth = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.AUTH_SUCCESS:
            localStorage.setItem('userToken', payload.token);

            return {
                ...state,
                isAuthenticated: true,
                loading: true,
                ...payload
            }
        case types.AUTH_FAIL:
            localStorage.removeItem('userToken');
            console.log(payload);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: payload
            }
        case types.REGISTER:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default auth;
