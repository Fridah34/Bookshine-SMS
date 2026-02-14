import { createContext, useContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import authService from '../services/api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Check if user is already logged in on mount
  useEffect(() => {
    const initAuth =  async () => {
      const storedUser = authService.getStoredUser();
      const token = authService.getToken();

      if (storedUser && token) {
        try{
          //Verify token is still valid
          const response = await authService.getCurrentUser();
          setUser(response.user);
        } catch (error) {
          //Token invalid ,clear storage
          authService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    try{
      const response = await authService.login(credentials);
      setUser(response.user);

      //Navigate based on role
      const roles = response.roles || [];
      const role = roles[0] || 'student';
      navigate(`/${role}`);

      return { success:true };
    }catch (error) {
      return {
        success:false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (data, type= 'student') => {
    try{
      let response;
      if (type === 'student') {
        response = await authService.registerStudent(data);
      }else if (type === 'parent') {
        response = await authService.registerParent(data);
      }

      console.log('Registration response:', response); // DEBUG
    console.log('User roles:', response.user.roles); // DEBUG

    navigate('/login', { 
      state: { 
        message: 'Registration successful! Please login with your credentials.',
        email: data.email // Pre-fill email on login page
      } 
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error response:', error.response?.data);
    
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed',
      errors: error.response?.data?.errors || {},
    };
  }
  };


  const logout = async () => {
    try {
      await authService.logout();
    }finally{
      setUser(null);
      navigate('/login');
    }
  }; 

  const value ={
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
 
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


