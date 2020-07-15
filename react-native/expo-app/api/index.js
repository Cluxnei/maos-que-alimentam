import axios from 'axios';
import {baseUrl} from "./Routes";
import {getData} from "../storage";
import {keys} from "../storage/Keys";

axios.defaults.baseURL= baseUrl;

axios.interceptors.request.use(async (config) => {
   const token = await getData(keys.token);
   if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
   }
   return config;
}, (error) => Promise.reject(error));

export default axios;
