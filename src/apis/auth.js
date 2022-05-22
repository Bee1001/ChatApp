import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    login(user) {
        return api.post('/auth/login', user);
    },

    register(user) {
        return api.post('/auth/register', user);
    }
}