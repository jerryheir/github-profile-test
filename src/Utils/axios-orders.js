import axios from 'axios';
import { BASE_URL } from './constants';

const axiosOrders = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "content-type": "application/json"
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosOrders;