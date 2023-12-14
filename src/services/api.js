import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.testankit.site/api', // 'http://localhost:8000/api' set this if running locally
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
