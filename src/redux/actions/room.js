import apis from '../../apis/room';
import * as types from '../types';

export default {
    getAllRoom: (token) => async (dispatch) => {
        try {
            const { data } = await apis.getAllRoom(token);

            dispatch({
                type: types.GET_ALLROOM,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    getRoom: (roomId) => async (dispatch) => {
        try {
            const { data } = await apis.getRoom(roomId);

            dispatch({
                type: types.GET_ROOM,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}