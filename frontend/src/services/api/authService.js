import api from './axios';

const authService ={
    //Register Student
    registerStudent:async (data) => {
        const response = await api.post('/register/student', data);
        return response.data;
    },

    //Register Parent
    registerParent: async (data) => {
        const response = await api.post('/register/parent', data);
        return response.data;
    },

    //Login
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        if(response.data.success) {
            //Store token and user data
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    //Logout
    logout:async () => {
        try{
            await api.post('/logout');
        }finally {
            //Clear local storage regardless of API response
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    //Get current user
    getCurrentUser: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/refresh');
    if (response.data.success) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('token');
  },

};

export default authService;