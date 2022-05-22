import * as types from '../types';

let initialState = {
    rooms: [],
    room: {},
    latestMessages: [],
    isLogged: false,
    loading: false,
    errors: null
}

const room = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.GET_ALLROOM:
            return {
                ...state,
                rooms: payload.rooms,
                latestMessages: payload.latestMessages
            }
        case types.GET_ROOM:
            return {
                ...state,
                room: payload,
            }
        default:
            return state;
    }
}

export default room;