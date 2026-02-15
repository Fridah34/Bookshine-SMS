import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Award, BookOpen, Calendar, Download, Eye, BarChart3, Target, Medal } from 'lucide-react';

const Grades = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [selectedYear, setSelectedYear] = useState('Form 3');

  // Kenyan high school grading system (A=12 to E=1)
  const getGrade = (marks) => {
    if (marks >= 80) return { grade: 'A', points: 12, color: 'from-green-500 to-emerald-500' };
    if (marks >= 75) return { grade: 'A-', points: 11, color: 'from-green-500 to-emerald-500' };
    if (marks >= 70) return { grade: 'B+', points: 10, color: 'from-blue-500 to-cyan-500' };
    if (marks >= 65) return { grade: 'B', points: 9, color: 'from-blue-500 to-cyan-500' };
    if (marks >= 60) return { grade: 'B-', points: 8, color: 'from-blue-400 to-cyan-400' };
    if (marks >= 55) return { grade: 'C+', points: 7, color: 'from-purple-500 to-pink-500' };
    if (marks >= 50) return { grade: 'C', points: 6, color: 'from-purple-500 to-pink-500' };
    if (marks >= 45) return { grade: 'C-', points: 5, color: 'from-amber-500 to-orange-500' };
    if (marks >= 40) return { grade: 'D+', points: 4, color: 'from-orange-500 to-red-500' };
    if (marks >= 35) return { grade: 'D', points: 3, color: 'from-orange-500 to-red-500' };
    if (marks >= 30) return { grade: 'D-', points: 2, color: 'from-red-500 to-rose-500' };
    return { grade: 'E', points: 1, color: 'from-red-600 to-rose-600' };
  };

  // Realistic Kenyan high school subjects with marks
  const subjects = {
    'Term 2': [
      { 
        name: 'Mathematics', 
        marks: 78, 
        outOf: 100, 
        catMarks: 25, 
        catOutOf: 30,
        teacher: 'Mr. Kimani',
        comment: 'Excellent progress in calculus',
        trend: 'up'
      },
      { 
        name: 'English', 
        marks: 72, 
        outOf: 100, 
        catMarks: 22, 
        catOutOf: 30,
        teacher: 'Mrs. Wanjiru',
        comment: 'Good composition skills',
        trend: 'up'
      },
      { 
        name: 'Kiswahili', 
        marks: 68, 
        outOf: 100, 
        catMarks: 20, 
        catOutOf: 30,
        teacher: 'Mwalimu Omondi',
        comment: 'Insha nzuri, endelea hivyo',
        trend: 'same'
      },
      { 
        name: 'Chemistry', 
        marks: 75, 
        outOf: 100, 
        catMarks: 24, 
        catOutOf: 30,
        teacher: 'Dr. Mwangi',
        comment: 'Strong practical skills',
        trend: 'up'
      },
      { 
        name: 'Physics', 
        marks: 71, 
        outOf: 100, 
        catMarks: 21, 
        catOutOf: 30,
        teacher: 'Mr. Njoroge',
        comment: 'Good understanding of mechanics',
        trend: 'down'
      },
      { 
        name: 'Biology', 
        marks: 80, 
        outOf: 100, 
        catMarks: 27, 
        catOutOf: 30,
        teacher: 'Mrs. Akinyi',
        comment: 'Outstanding lab reports',
        trend: 'up'
      },
      { 
        name: 'History & Government', 
        marks: 66, 
        outOf: 100, 
        catMarks: 19, 
        catOutOf: 30,
        teacher: 'Mr. Mutua',
        comment: 'Needs more essay practice',
        trend: 'same'
      },
      { 
        name: 'Geography', 
        marks: 73, 
        outOf: 100, 
        catMarks: 23, 
        catOutOf: 30,
        teacher: 'Mrs. Chepkemoi',
        comment: 'Excellent map work',
        trend: 'up'
      },
      { 
        name: 'Business Studies', 
        marks: 77, 
        outOf: 100, 
        catMarks: 25, 
        catOutOf: 30,
        teacher: 'Mr. Otieno',
        comment: 'Very good analytical skills',
        trend: 'up'
      },
      { 
        name: 'Computer Studies', 
        marks: 85, 
        outOf: 100, 
        catMarks: 28, 
        catOutOf: 30,
        teacher: 'Ms. Waithera',
        comment: 'Exceptional programming skills',
        trend: 'up'
      },
      { 
        name: 'Agriculture', 
        marks: 70, 
        outOf: 100, 
        catMarks: 21, 
        catOutOf: 30,
        teacher: 'Mr. Kariuki',
        comment: 'Good practical work',
        trend: 'same'
      }
    ]
  };

  const currentSubjects = subjects[selectedTerm];
  
  // Calculate statistics
  const totalMarks = currentSubjects.reduce((sum, subject) => sum + subject.marks, 0);
  const totalPossible = currentSubjects.reduce((sum, subject) => sum + subject.outOf, 0);
  const meanScore = (totalMarks / currentSubjects.length).toFixed(1);
  const totalPoints = currentSubjects.reduce((sum, subject) => sum + getGrade(subject.marks).points, 0);
  const meanGrade = getGrade((totalPoints / currentSubjects.length) * 100 / 12);
  const percentageScore = ((totalMarks / totalPossible) * 100).toFixed(1);

  // Class position and statistics
  const classPosition = 5;
  const streamPosition = 2;
  const totalStudents = 45;

  const terms = ['Term 1', 'Term 2', 'Term 3'];
  const years = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Academic Performance
              </h1>
              <p className="text-slate-600 text-lg">
                Academic Year 2024 • {selectedYear}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300">
                <Download className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-slate-700">Export Report</span>
              </button>
              <button className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300">
                <Eye className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-slate-700">View Analytics</span>
              </button>
            </div>
          </div>

          {/* Term and Year Selection */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-600">Academic Period:</span>
                </div>
                {terms.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSelectedTerm(term)}
                    className={`px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedTerm === term
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <span className="font-semibold">{term}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedYear === year
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <span className="font-semibold">{year}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Mean Score</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{meanScore}</div>
            <div className="text-xs text-slate-500 mt-1">out of 100</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meanGrade.color} flex items-center justify-center`}>
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Mean Grade</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{meanGrade.grade}</div>
            <div className="text-xs text-slate-500 mt-1">{totalPoints} points</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Medal className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Class Position</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{classPosition}</div>
            <div className="text-xs text-slate-500 mt-1">out of {totalStudents}</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Stream Position</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{streamPosition}</div>
            <div className="text-xs text-slate-500 mt-1">Science Stream</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Percentage</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{percentageScore}%</div>
            <div className="text-xs text-slate-500 mt-1">{totalMarks}/{totalPossible}</div>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Subject Performance</h2>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">{currentSubjects.length} Subjects</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">CAT Marks</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Exam Marks</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Grade</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Points</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Teacher</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Trend</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Comment</th>
                </tr>
              </thead>
              <tbody>
                {currentSubjects.map((subject, index) => {
                  const gradeInfo = getGrade(subject.marks);
                  return (
                    <tr 
                      key={index} 
                      className="border-t border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{subject.name}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-mono text-sm font-medium text-slate-700">
                          {subject.catMarks}/{subject.catOutOf}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-lg font-bold text-slate-800">
                            {subject.marks}
                          </span>
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${gradeInfo.color} transition-all duration-1000 ease-out`}
                              style={{ width: `${(subject.marks / subject.outOf) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradeInfo.color} flex items-center justify-center shadow-md`}>
                            <span className="text-lg font-bold text-white">{gradeInfo.grade}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-mono text-sm font-semibold text-slate-700">{gradeInfo.points}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{subject.teacher}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {subject.trend === 'up' && (
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                          )}
                          {subject.trend === 'down' && (
                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            </div>
                          )}
                          {subject.trend === 'same' && (
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                              <div className="w-4 h-0.5 bg-slate-600" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600 italic">{subject.comment}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teacher's General Remarks */}
        <div className="mt-8 bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Class Teacher's Remarks</h3>
          <p className="text-slate-700 leading-relaxed">
            Excellent overall performance this term. Shows strong understanding across all subjects, particularly in sciences. 
            Continue to maintain consistency in preparation and participation. Keep up the good work!
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Mrs. Margaret Njeri</p>
              <p className="text-xs text-slate-600">Form 3 Science Class Teacher</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">Principal's Signature</p>
              <p className="text-xs text-slate-600 font-mono">Date: 15/12/2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;