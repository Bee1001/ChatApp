import apis from '../../apis/auth';
import * as types from '../types';

export default {
    login: (user, history) => async (dispatch) => {
        try {
            const { data } = await apis.login(user);

            dispatch({
                type: types.AUTH_SUCCESS,
                payload: data
            })
            history.push('/');
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: types.AUTH_FAIL,
                payload: error.response.data
            })
            history.push('/login');
        }
    },

    register: (user, history) => async (dispatch) => {
        try {
            const { data } = await apis.register(user);

            dispatch({
                type: types.REGISTER,
                payload: data
            })
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }
}
