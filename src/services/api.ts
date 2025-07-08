import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.id.magiclab.space',
});

export default api;
