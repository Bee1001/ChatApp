import * as types from '../types';

let initialState = {
    user: null,
    notifications: [],
    isLogged: false,
    loading: false,
    errors: null
}

const user = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.GET_USER:
            return {
                ...state,
                user: payload,
                isLogged: true
            }
        case types.GET_NOTIFY:
            return {
                ...state,
                notifications: payload
            }
        case types.ACCEPT_FRIEND: 
            return { 
                ...state,
                notifications: state.notifications.filter(notification => notification._id !== payload)
            }
        case types.UPDATE_AVATAR:
            return {
                ...state,
                user: payload
            }
        case types.DELETE_FRIENDREQ:
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification._id !== payload)
            }
        default:
            return state;
    }
}

export default user;