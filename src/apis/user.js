import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    getUser(token) {
        return api.get(`/user/${token}`);
    },

    getNotify(token) {
        return api.get(`/user/notify/${token}`);
    },

    acpFriendReq(notifyId, userId, friendId) {
        return api.post('/user/acceptfriend', { notifyId: notifyId, userId: userId, friendId: friendId });
    },

    updateAvatar(token, formData, config) {
        return api.patch(`/user/avatar/${token}`, formData, config);
    },

    deleteFriendReq(notifyId) {
        return api.delete(`/user/delete/${notifyId}`);
    }
}