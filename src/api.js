import axios from 'axios';
import store from './store';

const api = axios.create({
    baseURL: 'http://localhost:3000', 
});

// Request interceptor to add authorization token
api.interceptors.request.use(config => {
    const token = store.state.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

// Response interceptor for error handling
api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        store.dispatch('logout');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export default api;