import axios from 'axios';
import {getLocalIP} from "../config/ReactotronConfig";
import {getToken} from "../store/asyncStorage";

const api = axios.create({
  baseURL: `http://${getLocalIP()}:8000/api`,
  validateStatus: (status) => status < 500,
  timeout: 60000,
});

api.interceptors.request.use(async configs => {
  configs.headers['Accept-Language'] = 'pt';
  const token = await getToken();
  if (token) {
    configs.headers.Authorization = `Bearer ${token}`;
  }
  return configs;
});

export default api;
