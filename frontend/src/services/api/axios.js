import axios from 'axios';

//Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

//Request interceptor - Add token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response interceptor -Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response){
            //Handle 401 unauthorized(token expired or invalid)
            if(error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }

            //Handle 403 Forbidden (insufficient permissions)
            if (error.response.status === 403) {
                console.error('Access denied:', error.response.data.message);
            }
        }
        return Promise.reject(error);
    }
);

export default api;