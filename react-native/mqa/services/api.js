import axios from 'axios';

export const baseURL = 'http://localhost';

const API_VERSION = 'v1';

const api = axios.create({
  baseURL: `${baseURL}/${API_VERSION}/`,
});

export default api;
