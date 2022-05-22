import apis from '../../apis/message';
import * as types from '../types';

export default {
    getMessages: (roomId) => async (dispatch) => {
        try {
            const { data } = await apis.getMessages(roomId);

            dispatch({
                type: types.GET_MESSAGES,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}