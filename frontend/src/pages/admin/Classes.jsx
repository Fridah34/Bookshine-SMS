import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  Save,
  Users,
  BookOpen,
  Award,
  Home,
  User,
  GraduationCap,
  AlertCircle
} from 'lucide-react';

const Classes = () => {
  const [currentView, setCurrentView] = useState('list'); // list, add, edit, view
  const [selectedClass, setSelectedClass] = useState(null);

  const [classes, setClasses] = useState([
    {
      id: 1,
      form: 'Form 1',
      stream: 'East A',
      classTeacher: 'Mrs. Grace Wanjiru',
      classTeacherId: 2,
      room: 'Room 101',
      capacity: 45,
      currentStudents: 42,
      boysCount: 22,
      girlsCount: 20,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'History', 'Geography', 'Business Studies']
    },
    {
      id: 2,
      form: 'Form 1',
      stream: 'East B',
      classTeacher: 'Mr. David Omondi',
      classTeacherId: 3,
      room: 'Room 102',
      capacity: 45,
      currentStudents: 43,
      boysCount: 21,
      girlsCount: 22,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'History', 'Geography', 'Computer Studies']
    },
    {
      id: 3,
      form: 'Form 2',
      stream: 'North A',
      classTeacher: 'Mr. Peter Mutua',
      classTeacherId: 5,
      room: 'Room 201',
      capacity: 45,
      currentStudents: 40,
      boysCount: 20,
      girlsCount: 20,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'History', 'Geography', 'Agriculture']
    },
    {
      id: 4,
      form: 'Form 2',
      stream: 'North B',
      classTeacher: 'Mrs. Mary Akinyi',
      classTeacherId: 4,
      room: 'Room 202',
      capacity: 45,
      currentStudents: 41,
      boysCount: 22,
      girlsCount: 19,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'History', 'Geography', 'Business Studies']
    },
    {
      id: 5,
      form: 'Form 3',
      stream: 'Science A',
      classTeacher: 'Mr. James Kimani',
      classTeacherId: 1,
      room: 'Room 301',
      capacity: 45,
      currentStudents: 38,
      boysCount: 20,
      girlsCount: 18,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'Geography']
    },
    {
      id: 6,
      form: 'Form 3',
      stream: 'Science B',
      classTeacher: 'Mrs. Sarah Njoroge',
      classTeacherId: 6,
      room: 'Room 302',
      capacity: 45,
      currentStudents: 39,
      boysCount: 21,
      girlsCount: 18,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'Computer Studies']
    },
    {
      id: 7,
      form: 'Form 3',
      stream: 'Arts A',
      classTeacher: 'Mr. Michael Mwangi',
      classTeacherId: 7,
      room: 'Room 303',
      capacity: 45,
      currentStudents: 35,
      boysCount: 15,
      girlsCount: 20,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'History', 'Geography', 'Business Studies', 'Agriculture']
    },
    {
      id: 8,
      form: 'Form 4',
      stream: 'Science A',
      classTeacher: 'Mrs. Grace Wanjiru',
      classTeacherId: 2,
      room: 'Room 401',
      capacity: 45,
      currentStudents: 40,
      boysCount: 22,
      girlsCount: 18,
      subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'Geography']
    }
  ]);

  // Available teachers (for dropdown)
  const availableTeachers = [
    { id: 1, name: 'Mr. James Kimani' },
    { id: 2, name: 'Mrs. Grace Wanjiru' },
    { id: 3, name: 'Mr. David Omondi' },
    { id: 4, name: 'Mrs. Mary Akinyi' },
    { id: 5, name: 'Mr. Peter Mutua' },
    { id: 6, name: 'Mrs. Sarah Njoroge' },
    { id: 7, name: 'Mr. Michael Mwangi' }
  ];

  const [formData, setFormData] = useState({
    form: '',
    stream: '',
    classTeacher: '',
    classTeacherId: '',
    room: '',
    capacity: 45,
    subjects: []
  });

  // Handle add class
  const handleAddClass = () => {
    const newClass = {
      id: classes.length + 1,
      ...formData,
      currentStudents: 0,
      boysCount: 0,
      girlsCount: 0
    };
    setClasses([...classes, newClass]);
    setCurrentView('list');
    resetForm();
  };

  // Handle update class
  const handleUpdateClass = () => {
    setClasses(classes.map(c => 
      c.id === selectedClass.id ? { ...selectedClass, ...formData } : c
    ));
    setCurrentView('list');
    resetForm();
  };

  // Handle delete class
  const handleDeleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class? This will unassign all students.')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      form: '',
      stream: '',
      classTeacher: '',
      classTeacherId: '',
      room: '',
      capacity: 45,
      subjects: []
    });
  };

  // Calculate statistics
  const stats = {
    totalClasses: classes.length,
    totalStudents: classes.reduce((sum, c) => sum + c.currentStudents, 0),
    averageClassSize: Math.round(classes.reduce((sum, c) => sum + c.currentStudents, 0) / classes.length),
    totalCapacity: classes.reduce((sum, c) => sum + c.capacity, 0),
    form1Classes: classes.filter(c => c.form === 'Form 1').length,
    form2Classes: classes.filter(c => c.form === 'Form 2').length,
    form3Classes: classes.filter(c => c.form === 'Form 3').length,
    form4Classes: classes.filter(c => c.form === 'Form 4').length
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Class Management</h1>
            <p className="text-slate-600 mt-1">Manage forms, streams, and class allocations</p>
          </div>
          <button 
            onClick={() => {
              resetForm();
              setCurrentView('add');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">Add Class</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Classes</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalClasses}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Students</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Class Size</p>
                <p className="text-2xl font-bold text-slate-800">{stats.averageClassSize}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Capacity</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalCapacity}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Home className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Classes by Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Form 1', 'Form 2', 'Form 3', 'Form 4'].map((form) => {
            const formClasses = classes.filter(c => c.form === form);
            const formStudents = formClasses.reduce((sum, c) => sum + c.currentStudents, 0);
            return (
              <div key={form} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <h3 className="font-bold text-slate-800 text-lg mb-2">{form}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Classes:</span>
                    <span className="font-semibold">{formClasses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Students:</span>
                    <span className="font-semibold">{formStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg per class:</span>
                    <span className="font-semibold">{formClasses.length > 0 ? Math.round(formStudents / formClasses.length) : 0}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Classes Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Class Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Gender Split
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {classes.map((classItem) => (
                  <tr key={classItem.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                          <BookOpen className="text-emerald-600" size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {classItem.form} - {classItem.stream}
                          </div>
                          <div className="text-sm text-slate-500">{classItem.subjects.length} subjects</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-emerald-600" />
                        {classItem.classTeacher}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Home size={16} className="text-slate-400" />
                        {classItem.room}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-slate-800">{classItem.currentStudents}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {classItem.boysCount}M
                        </span>
                        <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                          {classItem.girlsCount}F
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-20">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${(classItem.currentStudents / classItem.capacity) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600">{classItem.capacity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setSelectedClass(classItem);
                            setCurrentView('view');
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedClass(classItem);
                            setFormData(classItem);
                            setCurrentView('edit');
                          }}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClass(classItem.id)}
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
              {currentView === 'add' ? 'Add New Class' : 'Edit Class'}
            </h1>
            <p className="text-slate-600 mt-1">
              {currentView === 'add' 
                ? 'Create a new class/stream' 
                : `Editing: ${formData.form} - ${formData.stream}`
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="space-y-6">
            {/* Class Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Class Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="e.g., Science A, East A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Class Teacher *</label>
                  <select
                    value={formData.classTeacherId}
                    onChange={(e) => {
                      const teacherId = parseInt(e.target.value);
                      const teacher = availableTeachers.find(t => t.id === teacherId);
                      setFormData({
                        ...formData, 
                        classTeacherId: teacherId,
                        classTeacher: teacher ? teacher.name : ''
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Teacher</option>
                    {availableTeachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Number *</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({...formData, room: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Room 301"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    min="1"
                    max="60"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Subjects for this Class</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 
                  'Biology', 'History', 'Geography', 'Business Studies', 
                  'Computer Studies', 'Agriculture', 'Home Science'
                ].map((subject) => (
                  <label key={subject} className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.subjects?.includes(subject)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            subjects: [...(formData.subjects || []), subject]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            subjects: (formData.subjects || []).filter(s => s !== subject)
                          });
                        }
                      }}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{subject}</span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">Select all subjects that will be taught to this class</p>
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
                onClick={currentView === 'add' ? handleAddClass : handleUpdateClass}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                {currentView === 'add' ? 'Add Class' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW CLASS DETAIL
  if (currentView === 'view' && selectedClass) {
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
            <h1 className="text-3xl font-bold text-slate-800">Class Details</h1>
            <p className="text-slate-600 mt-1">{selectedClass.form} - {selectedClass.stream}</p>
          </div>
          <button
            onClick={() => {
              setFormData(selectedClass);
              setCurrentView('edit');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Edit size={20} />
            Edit Class
          </button>
        </div>

        {/* Class Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Student Count */}
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-800">{selectedClass.currentStudents}</p>
              <p className="text-sm text-slate-600">Total Students</p>
            </div>
            {/* Boys */}
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-800">{selectedClass.boysCount}</p>
              <p className="text-sm text-slate-600">Boys</p>
            </div>
            {/* Girls */}
            <div className="text-center p-6 bg-pink-50 rounded-xl">
              <User className="w-12 h-12 text-pink-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-slate-800">{selectedClass.girlsCount}</p>
              <p className="text-sm text-slate-600">Girls</p>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen size={20} className="text-emerald-600" />
                Class Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Form & Stream</p>
                  <p className="font-semibold text-slate-800">{selectedClass.form} - {selectedClass.stream}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Class Teacher</p>
                  <p className="font-semibold text-slate-800">{selectedClass.classTeacher}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Room</p>
                  <p className="font-semibold text-slate-800">{selectedClass.room}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Capacity</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-emerald-500 h-3 rounded-full transition-all"
                        style={{ width: `${(selectedClass.currentStudents / selectedClass.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="font-semibold text-slate-800">
                      {selectedClass.currentStudents} / {selectedClass.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Award size={20} className="text-emerald-600" />
                Subjects ({selectedClass.subjects.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedClass.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Capacity Alert */}
        {selectedClass.currentStudents >= selectedClass.capacity * 0.9 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Class Near Capacity</p>
                <p className="text-xs text-amber-800">
                  This class is at {Math.round((selectedClass.currentStudents / selectedClass.capacity) * 100)}% capacity. 
                  Consider adding another stream if enrollment continues.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Classes;