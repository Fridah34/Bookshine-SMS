import api from './axios';

const adminService = {
    // ========STUDENTS=======

    //Get all students
    getStudents: async (params ={}) => {
        const response = await api.get('/admin/students', { params});
        return response.data;

    },

    //Get single student
    getStudent: async (id) => {
        const response = await api.get(`/admin/students/${id}`);
        return response.data;
    },

    //Create student
    createStudent: async (data) => {
        const response = await api.post('/admin/students', data);
        return response.data;
    },

    //Update student
    updateStudent: async (id, data) => {
        const response = await api.put(`/admin/students/${id}` , data);
        return response.data;
    },

    //Delete student
    deleteStudent: async (id) => {
        const response = await api.delete(`/admin/students/${id}`);
        return response.data;
    },

    //======TEACHERS======

    //Get all teachers
    // Get all teachers
  getTeachers: async (params = {}) => {
    const response = await api.get('/admin/teachers', { params });
    return response.data;
  },

  // Get single teacher
  getTeacher: async (id) => {
    const response = await api.get(`/admin/teachers/${id}`);
    return response.data;
  },

  // Create teacher
  createTeacher: async (data) => {
    const response = await api.post('/admin/teachers', data);
    return response.data;
  },

  // Update teacher
  updateTeacher: async (id, data) => {
    const response = await api.put(`/admin/teachers/${id}`, data);
    return response.data;
  },

  // Delete teacher
  deleteTeacher: async (id) => {
    const response = await api.delete(`/admin/teachers/${id}`);
    return response.data;
  },

  // ========== USERS ==========
  
  // Get all users
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Deactivate user
  deactivateUser: async (id) => {
    const response = await api.post(`/admin/users/${id}/deactivate`);
    return response.data;
  },

  // Activate user
  activateUser: async (id) => {
    const response = await api.post(`/admin/users/${id}/activate`);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // ========== DASHBOARD ==========
  
  // Get admin dashboard data
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
};

export default adminService;