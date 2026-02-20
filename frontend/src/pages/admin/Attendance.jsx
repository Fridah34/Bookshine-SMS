import React ,{ useState } from 'react';
import {
    Search,Filter,Download,ArrowLeft, Save, Users,CheckCircle,XCircle,Clock,BookOpen,TrendingUp, Eye,ChevronDown
} from 'lucide-react';

const Attendance = () => {
    const [ currentView, setCurrentView] = useState('overview');
    const [ selectedForm, setSelectedForm] = useState ('');
    const [selectedStream, setSelectedStream] = useState ('');
    const [ selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [ searchQuery, setSearchQuery] = useState('');
    const [ filterForm, setFilterForm] = useState('all');

    //Classes available
    const classes = [
        {form: 'Form 1', streams: ['East A', 'East B', 'West A', 'West B'] },
        {form: 'Form 2', streams: ['North A', 'North B', 'South A', 'South B'] },
        {form: 'Form 3', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] },
        {form: 'Form 4', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] },
    ];

    //Mock stduents for attendance taking
    const [attendanceList, setAttendanceList] =useState([
        { id: 1, admissionNumber: 'SHS/2022/0456', name: 'Amani Odhiambo', status:'present', remarks: ''},
        { id: 2, admissionNumber: 'SHS/2022/0457', name: ' Grace wanjiru', status:'present', remarks: ''},
        { id: 3, admissionNumber: 'SHS/2022/0458', name: 'David Kamau', status:'absent', remarks: 'Sick'},
        { id: 4, admissionNumber: 'SHS/2022/0459', name: 'Faith Njeri', status:'present', remarks: ''},
        { id: 5, admissionNumber: 'SHS/2022/0460', name: 'Brian Mwangi', status:'late', remarks: 'Arrived 8:30 AM'},
        { id: 6, admissionNumber: 'SHS/2022/0461', name: 'Mercy Atieno', status:'present', remarks: ''},
        { id: 7, admissionNumber: 'SHS/2022/0462', name: 'Kevin Kipchoge', status:'absent', remarks: 'No reason given'},
        { id: 8, admissionNumber: 'SHS/2022/0463', name: 'Sharon Njoroge', status:'present', remarks: ''},
        { id: 9, admissionNumber: 'SHS/2022/0464', name: 'Isaac Mwenda', status:'present', remarks: ''},
        { id: 10, admissionNumber: 'SHS/2022/0465', name: 'Lydia Chebet', status:'late', remarks: 'Busy Delay'},

    ]);

    //Mock attendance history records
    const attendanceHistory = [
    { id: 1, form: 'Form 3', stream: 'Science A', date: '2024-11-20', present: 38, absent: 2, late: 1, total: 41, takenBy: 'Mr. James Kimani' },
    { id: 2, form: 'Form 2', stream: 'North A',   date: '2024-11-20', present: 39, absent: 1, late: 0, total: 40, takenBy: 'Mr. Peter Mutua' },
    { id: 3, form: 'Form 4', stream: 'Science A', date: '2024-11-20', present: 37, absent: 3, late: 0, total: 40, takenBy: 'Mrs. Grace Wanjiru' },
    { id: 4, form: 'Form 1', stream: 'East A',    date: '2024-11-19', present: 40, absent: 2, late: 1, total: 43, takenBy: 'Mrs. Grace Wanjiru' },
    { id: 5, form: 'Form 3', stream: 'Arts A',    date: '2024-11-19', present: 33, absent: 2, late: 0, total: 35, takenBy: 'Mr. Michael Mwangi' },
    { id: 6, form: 'Form 2', stream: 'North B',   date: '2024-11-19', present: 40, absent: 1, late: 0, total: 41, takenBy: 'Mrs. Mary Akinyi' },
    ];

    //Filtered history
    const filteredHistory = attendanceHistory.filter(record => {
        const matchesSearch = `${record.form} ${record.stream}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.takenBy.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesForm = filterForm === 'all' || record.form === filterForm;
        return matchesSearch && matchesForm;
    });

    //stats
    const stats = {
        totalPresent: attendanceHistory.reduce((sum, r) => sum + r.present, 0),
        totalAbsent: attendanceHistory.reduce((sum, r) => sum + r.absent, 0),
        totalLate: attendanceHistory.reduce((sum, r) => sum + r.late, 0),
        totalStudents: attendanceHistory.reduce((sum, r) => sum + r.total, 0),
    };
    const overallRate = ((stats.totalPresent / stats.totalStudents) * 100).toFixed(1);


    //update attendance status
  const updateStatus = (studentId, status) => {
    setAttendanceList(prev =>
      prev.map(s => s.id === studentId ? { ...s, status } : s)
    );
  };

  const updateRemarks = (studentId, remarks) => {
    setAttendanceList(prev =>
      prev.map(s => s.id === studentId ? { ...s, remarks } : s)
    );
  };

  const presentCount = attendanceList.filter(s => s.status === 'present').length;
  const absentCount  = attendanceList.filter(s => s.status === 'absent').length;
  const lateCount    = attendanceList.filter(s => s.status === 'late').length;

  const getStatusColor = (status) => {
    if (status === 'present') return 'bg-green-100 text-green-700';
    if (status === 'absent')  return 'bg-red-100 text-red-700';
    if (status === 'late')    return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  // ─── OVERVIEW PAGE ───
  if (currentView === 'overview') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
            <p className="text-slate-600 mt-1">Track and manage student attendance records</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download size={20} />
              <span className="font-medium">Export</span>
            </button>
            <button
              onClick={() => setCurrentView('take-attendance')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <CheckCircle size={20} />
              <span className="font-medium">Take Attendance</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-slate-800">{overallRate}%</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Present Today</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalPresent}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Absent</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalAbsent}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Late</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalLate}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick access: take attendance per form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {classes.map((classItem) => (
            <div key={classItem.form} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-emerald-600" size={20} />
                </div>
                <h4 className="font-bold text-slate-800">{classItem.form}</h4>
              </div>
              <p className="text-sm text-slate-600 mb-4">{classItem.streams.length} streams</p>
              <button
                onClick={() => {
                  setSelectedForm(classItem.form);
                  setCurrentView('take-attendance');
                }}
                className="w-full py-2 px-4 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
              >
                Take Attendance
              </button>
            </div>
          ))}
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by class or teacher..."
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
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">Attendance Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Late</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Taken By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredHistory.map((record) => {
                  const rate = ((record.present / record.total) * 100).toFixed(0);
                  return (
                    <tr key={record.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{record.form} - {record.stream}</div>
                        <div className="text-sm text-slate-500">{record.total} students</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(record.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {record.present}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          {record.absent}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                          {record.late}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${Number(rate) >= 90 ? 'bg-green-500' : Number(rate) >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{rate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {record.takenBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setCurrentView('view-register')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No attendance records found</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── TAKE ATTENDANCE PAGE ───
  if (currentView === 'take-attendance') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('overview')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Take Attendance</h1>
            <p className="text-slate-600 mt-1">Select a class and date to record attendance</p>
          </div>
        </div>

        {/* Class & Date Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Class & Date</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Form *</label>
              <select
                value={selectedForm}
                onChange={(e) => { setSelectedForm(e.target.value); setSelectedStream(''); }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Form</option>
                {classes.map(c => <option key={c.form} value={c.form}>{c.form}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stream *</label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                disabled={!selectedForm}
              >
                <option value="">Select Stream</option>
                {selectedForm && classes.find(c => c.form === selectedForm)?.streams.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                disabled={!selectedForm || !selectedStream}
                className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Load Students
              </button>
            </div>
          </div>
        </div>

        {/* Quick mark all */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-6 text-sm">
              <span className="font-semibold text-slate-700">Quick Mark:</span>
              <button
                onClick={() => setAttendanceList(prev => prev.map(s => ({ ...s, status: 'present' })))}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
              >
                <CheckCircle size={16} /> All Present
              </button>
              <button
                onClick={() => setAttendanceList(prev => prev.map(s => ({ ...s, status: 'absent' })))}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                <XCircle size={16} /> All Absent
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Present: <strong>{presentCount}</strong></span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Absent: <strong>{absentCount}</strong></span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span> Late: <strong>{lateCount}</strong></span>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Adm. No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {attendanceList.map((student, index) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{student.admissionNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {['present', 'absent', 'late'].map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(student.id, s)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                              student.status === s
                                ? s === 'present' ? 'bg-green-500 text-white border-green-500'
                                : s === 'absent'  ? 'bg-red-500 text-white border-red-500'
                                : 'bg-yellow-500 text-white border-yellow-500'
                                : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={student.remarks}
                        onChange={(e) => updateRemarks(student.id, e.target.value)}
                        placeholder="Optional remark..."
                        className="w-48 px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <button onClick={() => setCurrentView('overview')} className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => {
              alert('Attendance saved successfully!');
              setCurrentView('overview');
            }}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
          >
            <Save size={20} />
            Save Attendance
          </button>
        </div>
      </div>
    );
  }

  // ─── VIEW REGISTER PAGE ───
  if (currentView === 'view-register') {
    const record = attendanceHistory[0]; // mock: show first record
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('overview')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">Attendance Register</h1>
            <p className="text-slate-600 mt-1">
              {record.form} - {record.stream} • {new Date(record.date).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download size={20} />
            <span className="font-medium">Download</span>
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: record.total,   color: 'bg-blue-100 text-blue-600',   icon: Users },
            { label: 'Present',        value: record.present, color: 'bg-green-100 text-green-600',  icon: CheckCircle },
            { label: 'Absent',         value: record.absent,  color: 'bg-red-100 text-red-600',    icon: XCircle },
            { label: 'Late',           value: record.late,    color: 'bg-yellow-100 text-yellow-600', icon: Clock },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Register table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Adm. No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {attendanceList.map((student, index) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{student.admissionNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {student.remarks || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-sm text-slate-500">
            Taken by: <span className="font-semibold text-slate-700">{record.takenBy}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Attendance;