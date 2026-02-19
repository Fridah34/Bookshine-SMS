import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  Download,
  Upload,
  ArrowLeft,
  Save,
  Award,
  BookOpen,
  TrendingUp,
  Users,
  Edit,
  Eye,
  FileText,
  Calendar,
  CheckCircle
} from 'lucide-react';

const AcademicRecords = () => {
  const [currentView, setCurrentView] = useState('overview'); // overview, select-class, enter-marks, view-report
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');

  // Mock data - Classes
  const classes = [
    { form: 'Form 1', streams: ['East A', 'East B', 'West A', 'West B'] },
    { form: 'Form 2', streams: ['North A', 'North B', 'South A', 'South B'] },
    { form: 'Form 3', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] },
    { form: 'Form 4', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] }
  ];

  // Subjects
  const subjects = [
    'Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics', 
    'Biology', 'History', 'Geography', 'Business Studies', 'Computer Studies'
  ];

  // Exam types
  const examTypes = [
    'CAT 1', 'CAT 2', 'CAT 3', 'Mid-Term Exam', 'End-Term Exam'
  ];

  // Mock student data with marks
  const [studentMarks, setStudentMarks] = useState([
    {
      id: 1,
      admissionNumber: 'SHS/2022/0456',
      name: 'Amani Odhiambo',
      catMarks: 25,
      examMarks: 78,
      totalMarks: 103,
      grade: 'A',
      points: 12
    },
    {
      id: 2,
      admissionNumber: 'SHS/2022/0457',
      name: 'Grace Wanjiru',
      catMarks: 28,
      examMarks: 82,
      totalMarks: 110,
      grade: 'A',
      points: 12
    },
    {
      id: 3,
      admissionNumber: 'SHS/2022/0458',
      name: 'David Kamau',
      catMarks: 22,
      examMarks: 65,
      totalMarks: 87,
      grade: 'B+',
      points: 10
    },
    {
      id: 4,
      admissionNumber: 'SHS/2022/0459',
      name: 'Faith Njeri',
      catMarks: 20,
      examMarks: 58,
      totalMarks: 78,
      grade: 'B',
      points: 9
    },
    {
      id: 5,
      admissionNumber: 'SHS/2022/0460',
      name: 'Brian Mwangi',
      catMarks: 18,
      examMarks: 52,
      totalMarks: 70,
      grade: 'B-',
      points: 8
    }
  ]);

  // Performance statistics
  const stats = {
    totalStudents: 320,
    averageScore: 73.5,
    meanGrade: 'B+',
    passRate: 94.5,
    completedExams: 8,
    pendingExams: 2
  };

  // Calculate grade from total marks
  const calculateGrade = (total) => {
    if (total >= 100) return { grade: 'A', points: 12 };
    if (total >= 90) return { grade: 'A-', points: 11 };
    if (total >= 80) return { grade: 'B+', points: 10 };
    if (total >= 75) return { grade: 'B', points: 9 };
    if (total >= 70) return { grade: 'B-', points: 8 };
    if (total >= 65) return { grade: 'C+', points: 7 };
    if (total >= 60) return { grade: 'C', points: 6 };
    if (total >= 55) return { grade: 'C-', points: 5 };
    if (total >= 50) return { grade: 'D+', points: 4 };
    if (total >= 45) return { grade: 'D', points: 3 };
    if (total >= 40) return { grade: 'D-', points: 2 };
    return { grade: 'E', points: 1 };
  };

  // Update student marks
  const updateStudentMarks = (studentId, field, value) => {
    setStudentMarks(studentMarks.map(student => {
      if (student.id === studentId) {
        const updated = { ...student, [field]: parseInt(value) || 0 };
        const total = (updated.catMarks || 0) + (updated.examMarks || 0);
        const gradeInfo = calculateGrade(total);
        return {
          ...updated,
          totalMarks: total,
          grade: gradeInfo.grade,
          points: gradeInfo.points
        };
      }
      return student;
    }));
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A-') return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  // OVERVIEW PAGE
  if (currentView === 'overview') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Academic Records</h1>
            <p className="text-slate-600 mt-1">Manage student grades and exam results</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Upload size={20} />
              <span className="font-medium">Import Marks</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download size={20} />
              <span className="font-medium">Export Reports</span>
            </button>
            <button 
              onClick={() => setCurrentView('select-class')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Edit size={20} />
              <span className="font-medium">Enter Marks</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Students</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Average Score</p>
                <p className="text-2xl font-bold text-slate-800">{stats.averageScore}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Mean Grade</p>
                <p className="text-2xl font-bold text-slate-800">{stats.meanGrade}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pass Rate</p>
                <p className="text-2xl font-bold text-slate-800">{stats.passRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-slate-800">{stats.completedExams}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-slate-800">{stats.pendingExams}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Exams */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Exam Records</h3>
          <div className="space-y-3">
            {[
              { subject: 'Mathematics', form: 'Form 3A', exam: 'Mid-Term Exam', date: '2024-11-15', status: 'completed', avgScore: 75.5 },
              { subject: 'English', form: 'Form 4B', exam: 'End-Term Exam', date: '2024-11-20', status: 'completed', avgScore: 68.2 },
              { subject: 'Chemistry', form: 'Form 3B', exam: 'CAT 2', date: '2024-11-18', status: 'pending', avgScore: null },
              { subject: 'Kiswahili', form: 'Form 2A', exam: 'Mid-Term Exam', date: '2024-11-16', status: 'completed', avgScore: 72.8 }
            ].map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    exam.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <BookOpen className={exam.status === 'completed' ? 'text-green-600' : 'text-yellow-600'} size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{exam.subject} - {exam.form}</p>
                    <p className="text-sm text-slate-600">{exam.exam} • {new Date(exam.date).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {exam.avgScore && (
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Avg Score</p>
                      <p className="font-bold text-slate-800">{exam.avgScore}</p>
                    </div>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    exam.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Eye size={18} className="text-slate-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {classes.map((classItem, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all cursor-pointer">
              <h4 className="font-bold text-slate-800 text-lg mb-2">{classItem.form}</h4>
              <p className="text-sm text-slate-600 mb-4">{classItem.streams.length} Streams</p>
              <button 
                onClick={() => {
                  setSelectedForm(classItem.form);
                  setCurrentView('select-class');
                }}
                className="w-full py-2 px-4 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
              >
                Manage Records
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SELECT CLASS PAGE
  if (currentView === 'select-class') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('overview')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Select Class & Subject</h1>
            <p className="text-slate-600 mt-1">Choose the class and subject to enter marks</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="space-y-6">
            {/* Academic Period */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Academic Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Term</label>
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Class Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Class</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Form *</label>
                  <select
                    value={selectedForm}
                    onChange={(e) => {
                      setSelectedForm(e.target.value);
                      setSelectedStream('');
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Form</option>
                    {classes.map((c) => (
                      <option key={c.form} value={c.form}>{c.form}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stream *</label>
                  <select
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    disabled={!selectedForm}
                  >
                    <option value="">Select Stream</option>
                    {selectedForm && classes.find(c => c.form === selectedForm)?.streams.map((stream) => (
                      <option key={stream} value={stream}>{stream}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subject & Exam Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Subject & Exam</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Exam Type *</label>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Exam</option>
                    {examTypes.map((exam) => (
                      <option key={exam} value={exam}>{exam}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  if (selectedForm && selectedStream && selectedSubject && selectedExam) {
                    setCurrentView('enter-marks');
                  } else {
                    alert('Please select all required fields');
                  }
                }}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                disabled={!selectedForm || !selectedStream || !selectedSubject || !selectedExam}
              >
                Continue to Enter Marks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ENTER MARKS PAGE
  if (currentView === 'enter-marks') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('select-class')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">Enter Marks</h1>
            <p className="text-slate-600 mt-1">
              {selectedForm} - {selectedStream} • {selectedSubject} • {selectedExam} ({selectedTerm} {selectedYear})
            </p>
          </div>
          <button
            onClick={() => {
              alert('Marks saved successfully!');
              setCurrentView('overview');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Save size={20} />
            Save All Marks
          </button>
        </div>

        {/* Marks Entry Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Adm No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    CAT (30)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Exam (100)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total (130)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {studentMarks.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {student.admissionNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={student.catMarks}
                        onChange={(e) => updateStudentMarks(student.id, 'catMarks', e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.examMarks}
                        onChange={(e) => updateStudentMarks(student.id, 'examMarks', e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800">{student.totalMarks}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(student.grade)}`}>
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800">{student.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KCSE Grading Scale Reference */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-slate-800 mb-2">KCSE Grading Scale</h4>
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2 text-xs">
            <div className="text-center"><span className="font-bold">A</span> ≥100</div>
            <div className="text-center"><span className="font-bold">A-</span> 90-99</div>
            <div className="text-center"><span className="font-bold">B+</span> 80-89</div>
            <div className="text-center"><span className="font-bold">B</span> 75-79</div>
            <div className="text-center"><span className="font-bold">B-</span> 70-74</div>
            <div className="text-center"><span className="font-bold">C+</span> 65-69</div>
            <div className="text-center"><span className="font-bold">C</span> 60-64</div>
            <div className="text-center"><span className="font-bold">C-</span> 55-59</div>
            <div className="text-center"><span className="font-bold">D+</span> 50-54</div>
            <div className="text-center"><span className="font-bold">D</span> 45-49</div>
            <div className="text-center"><span className="font-bold">D-</span> 40-44</div>
            <div className="text-center"><span className="font-bold">E</span> &lt;40</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AcademicRecords;