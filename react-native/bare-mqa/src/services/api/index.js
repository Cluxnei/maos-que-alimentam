import axios from 'axios';
import {baseUrl} from './routes';

axios.defaults.baseURL = baseUrl;

export const setToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axios;
