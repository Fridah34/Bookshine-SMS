import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download,
  Upload,
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Home
} from 'lucide-react';

const Students = () => {
  const [currentView, setCurrentView] = useState('list'); // list, add, edit, view
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterForm, setFilterForm] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [students, setStudents] = useState([
    {
      id: 1,
      admissionNumber: 'SHS/2022/0456',
      nemisNumber: '12345678901',
      firstName: 'Amani',
      lastName: 'Odhiambo',
      email: 'amani.odhiambo@student.school.ac.ke',
      phone: '+254 712 345 678',
      gender: 'Male',
      dateOfBirth: '2008-03-15',
      form: 'Form 3',
      stream: 'Science A',
      status: 'active',
      county: 'Nairobi',
      subCounty: 'Westlands',
      guardianName: 'Mr. Peter Odhiambo',
      guardianPhone: '+254 722 987 654',
      guardianEmail: 'p.odhiambo@email.com'
    },
    {
      id: 2,
      admissionNumber: 'SHS/2022/0457',
      nemisNumber: '12345678902',
      firstName: 'Grace',
      lastName: 'Wanjiru',
      email: 'grace.wanjiru@student.school.ac.ke',
      phone: '+254 723 456 789',
      gender: 'Female',
      dateOfBirth: '2008-05-20',
      form: 'Form 3',
      stream: 'Science A',
      status: 'active',
      county: 'Kiambu',
      subCounty: 'Kikuyu',
      guardianName: 'Mrs. Jane Wanjiru',
      guardianPhone: '+254 733 456 789',
      guardianEmail: 'j.wanjiru@email.com'
    },
    {
      id: 3,
      admissionNumber: 'SHS/2023/0125',
      nemisNumber: '12345678903',
      firstName: 'David',
      lastName: 'Kamau',
      email: 'david.kamau@student.school.ac.ke',
      phone: '+254 734 567 890',
      gender: 'Male',
      dateOfBirth: '2009-01-10',
      form: 'Form 2',
      stream: 'Arts B',
      status: 'active',
      county: 'Nairobi',
      subCounty: 'Kasarani',
      guardianName: 'Mr. John Kamau',
      guardianPhone: '+254 744 567 890',
      guardianEmail: 'j.kamau@email.com'
    },
    {
      id: 4,
      admissionNumber: 'SHS/2024/0089',
      nemisNumber: '12345678904',
      firstName: 'Faith',
      lastName: 'Njeri',
      email: 'faith.njeri@student.school.ac.ke',
      phone: '+254 745 678 901',
      gender: 'Female',
      dateOfBirth: '2010-07-15',
      form: 'Form 1',
      stream: 'East A',
      status: 'active',
      county: 'Nairobi',
      subCounty: 'Dagoretti',
      guardianName: 'Mrs. Mary Njeri',
      guardianPhone: '+254 755 678 901',
      guardianEmail: 'm.njeri@email.com'
    },
    {
      id: 5,
      admissionNumber: 'SHS/2022/0458',
      nemisNumber: '12345678905',
      firstName: 'Brian',
      lastName: 'Mwangi',
      email: 'brian.mwangi@student.school.ac.ke',
      phone: '+254 756 789 012',
      gender: 'Male',
      dateOfBirth: '2008-11-28',
      form: 'Form 3',
      stream: 'Science B',
      status: 'suspended',
      county: 'Machakos',
      subCounty: 'Machakos Town',
      guardianName: 'Mr. Joseph Mwangi',
      guardianPhone: '+254 766 789 012',
      guardianEmail: 'j.mwangi@email.com'
    }
  ]);

  // New student form state
  const [formData, setFormData] = useState({
    admissionNumber: '',
    nemisNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    form: '',
    stream: '',
    county: '',
    subCounty: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: ''
  });

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesForm = filterForm === 'all' || student.form === filterForm;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesForm && matchesStatus;
  });

  // Handle add student
  const handleAddStudent = () => {
    const newStudent = {
      id: students.length + 1,
      ...formData,
      status: 'active'
    };
    setStudents([...students, newStudent]);
    setCurrentView('list');
    resetForm();
  };

  // Handle update student
  const handleUpdateStudent = () => {
    setStudents(students.map(s => 
      s.id === selectedStudent.id ? { ...selectedStudent, ...formData } : s
    ));
    setCurrentView('list');
    resetForm();
  };

  // Handle delete student
  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      admissionNumber: '',
      nemisNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      form: '',
      stream: '',
      county: '',
      subCounty: '',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      case 'graduated':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Student Management</h1>
            <p className="text-slate-600 mt-1">Manage student records and information</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Upload size={20} />
              <span className="font-medium">Import</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download size={20} />
              <span className="font-medium">Export</span>
            </button>
            <button 
              onClick={() => {
                resetForm();
                setCurrentView('add');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus size={20} />
              <span className="font-medium">Add Student</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Students</p>
                <p className="text-2xl font-bold text-slate-800">{students.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active</p>
                <p className="text-2xl font-bold text-slate-800">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Boys</p>
                <p className="text-2xl font-bold text-slate-800">
                  {students.filter(s => s.gender === 'Male').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Girls</p>
                <p className="text-2xl font-bold text-slate-800">
                  {students.filter(s => s.gender === 'Female').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <User className="text-pink-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, admission number, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600" />
              <select
                value={filterForm}
                onChange={(e) => setFilterForm(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Forms</option>
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Admission No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Form/Stream
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-slate-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {student.admissionNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {student.form} - {student.stream}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setSelectedStudent(student);
                            setCurrentView('view');
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedStudent(student);
                            setFormData(student);
                            setCurrentView('edit');
                          }}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No students found</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ADD/EDIT FORM VIEW
  if (currentView === 'add' || currentView === 'edit') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('list')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {currentView === 'add' ? 'Add New Student' : 'Edit Student'}
            </h1>
            <p className="text-slate-600 mt-1">
              {currentView === 'add' 
                ? 'Fill in the student information below' 
                : `Editing: ${formData.firstName} ${formData.lastName}`
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Admission Number *</label>
                  <input
                    type="text"
                    value={formData.admissionNumber}
                    onChange={(e) => setFormData({...formData, admissionNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">NEMIS Number *</label>
                  <input
                    type="text"
                    value={formData.nemisNumber}
                    onChange={(e) => setFormData({...formData, nemisNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    maxLength="11"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Form *</label>
                  <select
                    value={formData.form}
                    onChange={(e) => setFormData({...formData, form: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Form</option>
                    <option value="Form 1">Form 1</option>
                    <option value="Form 2">Form 2</option>
                    <option value="Form 3">Form 3</option>
                    <option value="Form 4">Form 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stream *</label>
                  <input
                    type="text"
                    value={formData.stream}
                    onChange={(e) => setFormData({...formData, stream: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Science A, Arts B"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+254 7XX XXX XXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">County *</label>
                  <input
                    type="text"
                    value={formData.county}
                    onChange={(e) => setFormData({...formData, county: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sub-County *</label>
                  <input
                    type="text"
                    value={formData.subCounty}
                    onChange={(e) => setFormData({...formData, subCounty: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Guardian Name *</label>
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Guardian Phone *</label>
                  <input
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({...formData, guardianPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Guardian Email</label>
                  <input
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => setFormData({...formData, guardianEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setCurrentView('list')}
                className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={currentView === 'add' ? handleAddStudent : handleUpdateStudent}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                {currentView === 'add' ? 'Add Student' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW STUDENT DETAIL
  if (currentView === 'view' && selectedStudent) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('list')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">Student Details</h1>
            <p className="text-slate-600 mt-1">View complete student information</p>
          </div>
          <button
            onClick={() => {
              setFormData(selectedStudent);
              setCurrentView('edit');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Edit size={20} />
            Edit Student
          </button>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-3xl">
              {selectedStudent.firstName.charAt(0)}{selectedStudent.lastName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                {selectedStudent.firstName} {selectedStudent.lastName}
              </h2>
              <p className="text-slate-600 mb-3">{selectedStudent.email}</p>
              <div className="flex gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedStudent.status)}`}>
                  {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {selectedStudent.form} - {selectedStudent.stream}
                </span>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <User size={20} className="text-emerald-600" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Admission Number</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.admissionNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">NEMIS Number</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.nemisNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Gender</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Date of Birth</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(selectedStudent.dateOfBirth).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Phone size={20} className="text-emerald-600" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.subCounty}, {selectedStudent.county}</p>
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Users size={20} className="text-emerald-600" />
                Guardian Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Guardian Name</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.guardianName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Guardian Phone</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.guardianPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Guardian Email</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.guardianEmail}</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen size={20} className="text-emerald-600" />
                Academic Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Form</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.form}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Stream</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.stream}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <p className="font-semibold text-slate-800">{selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Students;