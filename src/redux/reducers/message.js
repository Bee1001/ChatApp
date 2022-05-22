import * as types from '../types';

let initialState = {
    messages: [],
    isLogged: false,
    loading: false,
    errors: null
}

const message = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.GET_MESSAGES:
            return {
                ...state,
                messages: payload
            }
        default:
            return state;
    }
}

export default message;