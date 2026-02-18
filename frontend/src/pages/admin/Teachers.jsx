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
  Award,
  Briefcase,
  Crown
} from 'lucide-react';

const Teachers = () => {
  const [currentView, setCurrentView] = useState('list'); // list, add, edit, view
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      employeeNumber: 'TCH/2020/001',
      tscNumber: 'TSC/12345678',
      firstName: 'James',
      lastName: 'Kimani',
      email: 'j.kimani@school.ac.ke',
      phone: '+254 722 123 456',
      gender: 'Male',
      dateOfBirth: '1985-03-15',
      qualification: 'Bachelor of Education (Science)',
      department: 'Science',
      subjects: ['Mathematics', 'Physics'],
      classTeacher: 'Form 3A',
      leadershipRole: 'Head of Science Department',
      dateOfJoining: '2020-01-15',
      status: 'active',
      county: 'Nairobi',
      subCounty: 'Westlands',
      nationalId: '12345678'
    },
    {
      id: 2,
      employeeNumber: 'TCH/2019/015',
      tscNumber: 'TSC/23456789',
      firstName: 'Grace',
      lastName: 'Wanjiru',
      email: 'g.wanjiru@school.ac.ke',
      phone: '+254 733 234 567',
      gender: 'Female',
      dateOfBirth: '1988-07-22',
      qualification: 'Master of Education (Languages)',
      department: 'Languages',
      subjects: ['English', 'Literature'],
      classTeacher: 'Form 2B',
      leadershipRole: 'Head of Languages Department',
      dateOfJoining: '2019-09-01',
      status: 'active',
      county: 'Kiambu',
      subCounty: 'Kikuyu',
      nationalId: '23456789'
    },
    {
      id: 3,
      employeeNumber: 'TCH/2021/008',
      tscNumber: 'TSC/34567890',
      firstName: 'David',
      lastName: 'Omondi',
      email: 'd.omondi@school.ac.ke',
      phone: '+254 744 345 678',
      gender: 'Male',
      dateOfBirth: '1990-11-10',
      qualification: 'Bachelor of Education (Kiswahili)',
      department: 'Languages',
      subjects: ['Kiswahili'],
      classTeacher: null,
      leadershipRole: null,
      dateOfJoining: '2021-05-10',
      status: 'active',
      county: 'Nairobi',
      subCounty: 'Kasarani',
      nationalId: '34567890'
    },
    {
      id: 4,
      employeeNumber: 'TCH/2018/022',
      tscNumber: 'TSC/45678901',
      firstName: 'Mary',
      lastName: 'Akinyi',
      email: 'm.akinyi@school.ac.ke',
      phone: '+254 755 456 789',
      gender: 'Female',
      dateOfBirth: '1983-05-18',
      qualification: 'Bachelor of Science (Biology)',
      department: 'Science',
      subjects: ['Biology', 'Chemistry'],
      classTeacher: 'Form 4A',
      leadershipRole: 'Exams Coordinator',
      dateOfJoining: '2018-01-08',
      status: 'active',
      county: 'Kisumu',
      subCounty: 'Kisumu East',
      nationalId: '45678901'
    },
    {
      id: 5,
      employeeNumber: 'TCH/2020/012',
      tscNumber: 'TSC/56789012',
      firstName: 'Peter',
      lastName: 'Mutua',
      email: 'p.mutua@school.ac.ke',
      phone: '+254 766 567 890',
      gender: 'Male',
      dateOfBirth: '1987-09-25',
      qualification: 'Bachelor of Arts (History)',
      department: 'Humanities',
      subjects: ['History', 'Geography'],
      classTeacher: 'Form 1C',
      leadershipRole: 'Head of Humanities Department',
      dateOfJoining: '2020-03-20',
      status: 'on-leave',
      county: 'Machakos',
      subCounty: 'Machakos Town',
      nationalId: '56789012'
    },
    {
      id: 6,
      employeeNumber: 'TCH/2017/005',
      tscNumber: 'TSC/67890123',
      firstName: 'Sarah',
      lastName: 'Njoroge',
      email: 's.njoroge@school.ac.ke',
      phone: '+254 777 678 901',
      gender: 'Female',
      dateOfBirth: '1982-12-05',
      qualification: 'Bachelor of Education (Mathematics)',
      department: 'Mathematics',
      subjects: ['Mathematics'],
      classTeacher: 'Form 3B',
      leadershipRole: 'Head of Mathematics Department',
      dateOfJoining: '2017-02-15',
      status: 'active',
      county: 'Nairobi',
      subCounty: 'Embakasi',
      nationalId: '67890123'
    },
    {
      id: 7,
      employeeNumber: 'TCH/2019/020',
      tscNumber: 'TSC/78901234',
      firstName: 'Michael',
      lastName: 'Mwangi',
      email: 'm.mwangi@school.ac.ke',
      phone: '+254 788 789 012',
      gender: 'Male',
      dateOfBirth: '1986-08-14',
      qualification: 'Diploma in Technical Education',
      department: 'Technical',
      subjects: ['Computer Studies', 'Business Studies'],
      classTeacher: 'Form 2A',
      leadershipRole: 'ICT Coordinator',
      dateOfJoining: '2019-06-01',
      status: 'active',
      county: 'Nairobi',
      subCounty: 'Dagoretti',
      nationalId: '78901234'
    }
  ]);

  // New teacher form state
  const [formData, setFormData] = useState({
    employeeNumber: '',
    tscNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    qualification: '',
    department: '',
    subjects: [],
    classTeacher: '',
    leadershipRole: '',
    dateOfJoining: '',
    county: '',
    subCounty: '',
    nationalId: ''
  });

  // Leadership roles options
  const leadershipRoles = [
    'Head of Science Department',
    'Head of Mathematics Department',
    'Head of Languages Department',
    'Head of Humanities Department',
    'Head of Technical Department',
    'Exams Coordinator',
    'Sports Coordinator',
    'ICT Coordinator',
    'Guidance & Counseling',
    'Disciplinary Master/Mistress',
    'Library Coordinator',
    'Deputy Principal',
    'Senior Teacher'
  ];

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || teacher.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || teacher.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get leadership statistics
  const leadershipStats = {
    totalLeaders: teachers.filter(t => t.leadershipRole).length,
    departmentHeads: teachers.filter(t => t.leadershipRole && t.leadershipRole.includes('Head of')).length,
    coordinators: teachers.filter(t => t.leadershipRole && t.leadershipRole.includes('Coordinator')).length
  };

  // Handle add teacher
  const handleAddTeacher = () => {
    const newTeacher = {
      id: teachers.length + 1,
      ...formData,
      status: 'active'
    };
    setTeachers([...teachers, newTeacher]);
    setCurrentView('list');
    resetForm();
  };

  // Handle update teacher
  const handleUpdateTeacher = () => {
    setTeachers(teachers.map(t => 
      t.id === selectedTeacher.id ? { ...selectedTeacher, ...formData } : t
    ));
    setCurrentView('list');
    resetForm();
  };

  // Handle delete teacher
  const handleDeleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      employeeNumber: '',
      tscNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      qualification: '',
      department: '',
      subjects: [],
      classTeacher: '',
      leadershipRole: '',
      dateOfJoining: '',
      county: '',
      subCounty: '',
      nationalId: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      case 'retired':
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
            <h1 className="text-3xl font-bold text-slate-800">Teacher Management</h1>
            <p className="text-slate-600 mt-1">Manage teacher records and assignments</p>
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
              <span className="font-medium">Add Teacher</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Teachers</p>
                <p className="text-2xl font-bold text-slate-800">{teachers.length}</p>
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
                  {teachers.filter(t => t.status === 'active').length}
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
                <p className="text-sm text-slate-600">Class Teachers</p>
                <p className="text-2xl font-bold text-slate-800">
                  {teachers.filter(t => t.classTeacher).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Dept. Heads</p>
                <p className="text-2xl font-bold text-slate-800">
                  {leadershipStats.departmentHeads}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Coordinators</p>
                <p className="text-2xl font-bold text-slate-800">
                  {leadershipStats.coordinators}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Briefcase className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">On Leave</p>
                <p className="text-2xl font-bold text-slate-800">
                  {teachers.filter(t => t.status === 'on-leave').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Roles Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Crown className="text-purple-600" size={24} />
            Leadership Positions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teachers.filter(t => t.leadershipRole).map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold flex-shrink-0">
                    {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{teacher.firstName} {teacher.lastName}</p>
                    <p className="text-sm text-purple-600 font-medium">{teacher.leadershipRole}</p>
                    <p className="text-xs text-slate-500">{teacher.department}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, employee number, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                <option value="Science">Science</option>
                <option value="Languages">Languages</option>
                <option value="Humanities">Humanities</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Technical">Technical</option>
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="suspended">Suspended</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        {/* Teachers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Employee No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  {/* ── ADDED: Class Teacher column header ── */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Class Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Leadership Role
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
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold relative">
                          {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                          {teacher.leadershipRole && (
                            <Crown className="absolute -top-1 -right-1 w-4 h-4 text-purple-600 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-sm text-slate-500">{teacher.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {teacher.employeeNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {teacher.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {teacher.subjects.join(', ')}
                    </td>
                    {/* ── ADDED: Class Teacher column data ── */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teacher.classTeacher ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {teacher.classTeacher}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teacher.leadershipRole ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {teacher.leadershipRole}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                        {teacher.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setCurrentView('view');
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setFormData(teacher);
                            setCurrentView('edit');
                          }}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTeacher(teacher.id)}
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

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No teachers found</p>
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
              {currentView === 'add' ? 'Add New Teacher' : 'Edit Teacher'}
            </h1>
            <p className="text-slate-600 mt-1">
              {currentView === 'add' 
                ? 'Fill in the teacher information below' 
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">National ID *</label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Employment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Employee Number *</label>
                  <input
                    type="text"
                    value={formData.employeeNumber}
                    onChange={(e) => setFormData({...formData, employeeNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">TSC Number *</label>
                  <input
                    type="text"
                    value={formData.tscNumber}
                    onChange={(e) => setFormData({...formData, tscNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Joining *</label>
                  <input
                    type="date"
                    value={formData.dateOfJoining}
                    onChange={(e) => setFormData({...formData, dateOfJoining: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Qualification *</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Bachelor of Education (Science)"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teaching Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Teaching Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>
                {/* ── ADDED: Class Teacher field in form ── */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Class Teacher Of (Optional)</label>
                  <input
                    type="text"
                    value={formData.classTeacher}
                    onChange={(e) => setFormData({...formData, classTeacher: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Form 3A"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subjects Taught (comma-separated) *</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.subjects) ? formData.subjects.join(', ') : formData.subjects}
                    onChange={(e) => setFormData({...formData, subjects: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Mathematics, Physics"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Leadership Role (Optional)</label>
                  <select
                    value={formData.leadershipRole}
                    onChange={(e) => setFormData({...formData, leadershipRole: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">None</option>
                    {leadershipRoles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-500">Select if this teacher holds a leadership position</p>
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setCurrentView('list')}
                className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={currentView === 'add' ? handleAddTeacher : handleUpdateTeacher}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                {currentView === 'add' ? 'Add Teacher' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW TEACHER DETAIL
  if (currentView === 'view' && selectedTeacher) {
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
            <h1 className="text-3xl font-bold text-slate-800">Teacher Details</h1>
            <p className="text-slate-600 mt-1">View complete teacher information</p>
          </div>
          <button
            onClick={() => {
              setFormData(selectedTeacher);
              setCurrentView('edit');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Edit size={20} />
            Edit Teacher
          </button>
        </div>

        {/* Teacher Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-3xl relative">
              {selectedTeacher.firstName.charAt(0)}{selectedTeacher.lastName.charAt(0)}
              {selectedTeacher.leadershipRole && (
                <Crown className="absolute -top-2 -right-2 w-8 h-8 text-purple-600 bg-white rounded-full p-1" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                {selectedTeacher.firstName} {selectedTeacher.lastName}
              </h2>
              <p className="text-slate-600 mb-3">{selectedTeacher.email}</p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedTeacher.status)}`}>
                  {selectedTeacher.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {selectedTeacher.department}
                </span>
                {selectedTeacher.classTeacher && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Class Teacher: {selectedTeacher.classTeacher}
                  </span>
                )}
                {selectedTeacher.leadershipRole && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Crown size={14} />
                    {selectedTeacher.leadershipRole}
                  </span>
                )}
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
                  <p className="text-sm text-slate-600">Employee Number</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.employeeNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">TSC Number</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.tscNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">National ID</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.nationalId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Gender</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Date of Birth</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(selectedTeacher.dateOfBirth).toLocaleDateString('en-GB')}
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
                  <p className="font-semibold text-slate-800">{selectedTeacher.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.subCounty}, {selectedTeacher.county}</p>
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Briefcase size={20} className="text-emerald-600" />
                Employment Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Date of Joining</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(selectedTeacher.dateOfJoining).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Qualification</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.qualification}</p>
                </div>
              </div>
            </div>

            {/* Teaching Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen size={20} className="text-emerald-600" />
                Teaching Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Department</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.department}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Subjects</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedTeacher.subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Class Teacher Of</p>
                  <p className="font-semibold text-slate-800">{selectedTeacher.classTeacher || 'Not assigned'}</p>
                </div>
                {selectedTeacher.leadershipRole && (
                  <div>
                    <p className="text-sm text-slate-600">Leadership Role</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Crown size={16} className="text-purple-600" />
                      <p className="font-semibold text-purple-700">{selectedTeacher.leadershipRole}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Teachers;