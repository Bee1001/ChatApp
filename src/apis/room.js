import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    getAllRoom(token) {
        return api.get(`/room/all/${token}`);
    },

    getRoom(roomId) {
        return api.get(`/room/${roomId}`);
    }
}