import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const uploadImage = (uri) => {
    // const formData = new FormData();
    // formData.append('image', image);
    //
    // const config = {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // }

    return api.post('/message/uploadImage', {
        image: uri
    });
}
