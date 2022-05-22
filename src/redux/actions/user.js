import apis from '../../apis/user';
import * as types from '../types';

export default {
    getUser: (token) => async (dispatch) => {
        try {
            const { data } = await apis.getUser(token);

            dispatch({
                type: types.GET_USER,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    getNotify: (token) => async (dispatch) => {
        try {
            const { data } = await apis.getNotify(token);

            dispatch({
                type: types.GET_NOTIFY,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    acpFriendReq: (notifyId, userId, friendId) => async (dispatch) => {
        try {
            const { data } = await apis.acpFriendReq(notifyId, userId, friendId);

            dispatch({
                type: types.ACCEPT_FRIEND,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    updateAvatar: (token, avatar) => async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatar);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await apis.updateAvatar(token, formData, config);

            dispatch({
                type: types.UPDATE_AVATAR,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    deleteFriendReq: (notifyId) => async (dispatch) => {
        try {
            const { data } = await apis.deleteFriendReq(notifyId);

            dispatch({
                type: types.DELETE_FRIENDREQ,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}