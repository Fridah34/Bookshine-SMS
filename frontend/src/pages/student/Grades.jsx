import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Award, BookOpen, Calendar, Download, Eye, BarChart3, Target, Medal, Users } from 'lucide-react';

const Grades = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [selectedYear, setSelectedYear] = useState('Form 3');

  // Student info (would come from auth/context)
  const studentName = 'John Kamau';
  const admissionNumber = '3025/2023';
  const streamName = 'Form 3 Science';

  // Official KNEC Grading System (A=12 to E=1)
  const getGrade = (marks) => {
    if (marks >= 80) return { grade: 'A', points: 12, color: 'from-green-500 to-emerald-500', remark: 'Excellent' };
    if (marks >= 75) return { grade: 'A-', points: 11, color: 'from-green-500 to-emerald-500', remark: 'Excellent' };
    if (marks >= 70) return { grade: 'B+', points: 10, color: 'from-blue-500 to-cyan-500', remark: 'Very Good' };
    if (marks >= 65) return { grade: 'B', points: 9, color: 'from-blue-500 to-cyan-500', remark: 'Good' };
    if (marks >= 60) return { grade: 'B-', points: 8, color: 'from-blue-400 to-cyan-400', remark: 'Good' };
    if (marks >= 55) return { grade: 'C+', points: 7, color: 'from-purple-500 to-pink-500', remark: 'Satisfactory' };
    if (marks >= 50) return { grade: 'C', points: 6, color: 'from-purple-500 to-pink-500', remark: 'Satisfactory' };
    if (marks >= 45) return { grade: 'C-', points: 5, color: 'from-amber-500 to-orange-500', remark: 'Average' };
    if (marks >= 40) return { grade: 'D+', points: 4, color: 'from-orange-500 to-red-500', remark: 'Below Average' };
    if (marks >= 35) return { grade: 'D', points: 3, color: 'from-orange-500 to-red-500', remark: 'Weak' };
    if (marks >= 30) return { grade: 'D-', points: 2, color: 'from-red-500 to-rose-500', remark: 'Weak' };
    return { grade: 'E', points: 1, color: 'from-red-600 to-rose-600', remark: 'Very Weak' };
  };

  // Kenyan Curriculum Subjects with proper CAT (30) and Exam (70) structure
  const subjects = {
    'Term 2': [
      { 
        name: 'Mathematics', 
        catMarks: 23,
        catOutOf: 30,
        examMarks: 55,
        examOutOf: 70,
        totalMarks: 78,
        totalOutOf: 100,
        teacher: 'Mr. Peter Kimani',
        remarks: 'Excellent progress in calculus and algebra. Keep up the good work.',
        trend: 'up',
        positionInSubject: 3
      },
      { 
        name: 'English', 
        catMarks: 21,
        catOutOf: 30,
        examMarks: 51,
        examOutOf: 70,
        totalMarks: 72,
        totalOutOf: 100,
        teacher: 'Mrs. Jane Wanjiru',
        remarks: 'Good composition skills. Work on grammar and comprehension.',
        trend: 'up',
        positionInSubject: 5
      },
      { 
        name: 'Kiswahili', 
        catMarks: 19,
        catOutOf: 30,
        examMarks: 49,
        examOutOf: 70,
        totalMarks: 68,
        totalOutOf: 100,
        teacher: 'Mwalimu David Omondi',
        remarks: 'Insha nzuri lakini sarufi inahitaji kuboreshwa. Endelea kufanya bidii.',
        trend: 'same',
        positionInSubject: 8
      },
      { 
        name: 'Chemistry', 
        catMarks: 24,
        catOutOf: 30,
        examMarks: 51,
        examOutOf: 70,
        totalMarks: 75,
        totalOutOf: 100,
        teacher: 'Dr. James Mwangi',
        remarks: 'Strong practical and theoretical skills. Excellent lab work.',
        trend: 'up',
        positionInSubject: 2
      },
      { 
        name: 'Physics', 
        catMarks: 20,
        catOutOf: 30,
        examMarks: 51,
        examOutOf: 70,
        totalMarks: 71,
        totalOutOf: 100,
        teacher: 'Mr. Samuel Njoroge',
        remarks: 'Good understanding of mechanics. Practice more on electricity.',
        trend: 'down',
        positionInSubject: 6
      },
      { 
        name: 'Biology', 
        catMarks: 27,
        catOutOf: 30,
        examMarks: 53,
        examOutOf: 70,
        totalMarks: 80,
        totalOutOf: 100,
        teacher: 'Mrs. Grace Akinyi',
        remarks: 'Outstanding performance. Excellent understanding of all topics.',
        trend: 'up',
        positionInSubject: 1
      },
      { 
        name: 'History and Government', 
        catMarks: 18,
        catOutOf: 30,
        examMarks: 48,
        examOutOf: 70,
        totalMarks: 66,
        totalOutOf: 100,
        teacher: 'Mr. Joseph Mutua',
        remarks: 'Fair performance. Needs more essay writing practice and revision.',
        trend: 'same',
        positionInSubject: 12
      },
      { 
        name: 'Geography', 
        catMarks: 22,
        catOutOf: 30,
        examMarks: 51,
        examOutOf: 70,
        totalMarks: 73,
        totalOutOf: 100,
        teacher: 'Mrs. Mary Chepkemoi',
        remarks: 'Excellent map work and practical skills. Well done.',
        trend: 'up',
        positionInSubject: 4
      },
      { 
        name: 'Christian Religious Education', 
        catMarks: 25,
        catOutOf: 30,
        examMarks: 52,
        examOutOf: 70,
        totalMarks: 77,
        totalOutOf: 100,
        teacher: 'Mrs. Ruth Wambui',
        remarks: 'Very good understanding of biblical teachings and application.',
        trend: 'up',
        positionInSubject: 2
      },
      { 
        name: 'Business Studies', 
        catMarks: 24,
        catOutOf: 30,
        examMarks: 53,
        examOutOf: 70,
        totalMarks: 77,
        totalOutOf: 100,
        teacher: 'Mr. Patrick Otieno',
        remarks: 'Very good analytical and business application skills.',
        trend: 'up',
        positionInSubject: 3
      },
      { 
        name: 'Computer Studies', 
        catMarks: 28,
        catOutOf: 30,
        examMarks: 57,
        examOutOf: 70,
        totalMarks: 85,
        totalOutOf: 100,
        teacher: 'Ms. Lucy Waithera',
        remarks: 'Exceptional programming and practical skills. Top of class.',
        trend: 'up',
        positionInSubject: 1
      },
      { 
        name: 'Agriculture', 
        catMarks: 20,
        catOutOf: 30,
        examMarks: 50,
        examOutOf: 70,
        totalMarks: 70,
        totalOutOf: 100,
        teacher: 'Mr. Daniel Kariuki',
        remarks: 'Good practical work. Theory needs more attention.',
        trend: 'same',
        positionInSubject: 7
      }
    ]
  };

  const currentSubjects = subjects[selectedTerm];
  
  // Calculate statistics using top 8 subjects (as per KCSE rules for university entry)
  const sortedByPoints = [...currentSubjects]
    .map(subject => ({ ...subject, ...getGrade(subject.totalMarks) }))
    .sort((a, b) => b.points - a.points);
  
  const top8Subjects = sortedByPoints.slice(0, 8);
  const totalPoints = top8Subjects.reduce((sum, subject) => sum + subject.points, 0);
  const meanGradePoints = totalPoints / 8;
  const meanGrade = getGrade(meanGradePoints * 100 / 12);
  
  const totalMarks = currentSubjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
  const totalPossible = currentSubjects.reduce((sum, subject) => sum + subject.totalOutOf, 0);
  const meanScore = (totalMarks / currentSubjects.length).toFixed(1);
  const percentageScore = ((totalMarks / totalPossible) * 100).toFixed(1);

  // Positions
  const overallPosition = 5;
  const streamPosition = 2;
  const totalStudentsInForm = 180;
  const totalStudentsInStream = 45;

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
                Academic Report
              </h1>
              <p className="text-slate-600 text-lg">
                {studentName} • Adm. No: {admissionNumber}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300">
                <Download className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-slate-700">Download Report</span>
              </button>
              <button className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300">
                <Eye className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-slate-700">View Analytics</span>
              </button>
            </div>
          </div>

          {/* Student Info Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-xs text-slate-600">Class</p>
                    <p className="font-semibold text-slate-800">{streamName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-slate-600">Subjects</p>
                    <p className="font-semibold text-slate-800">{currentSubjects.length} Subjects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Term and Year Selection */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-600">Select Term:</span>
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
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
            <div className="text-xs text-slate-500 mt-1">{meanGrade.remark}</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Total Points</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{totalPoints}</div>
            <div className="text-xs text-slate-500 mt-1">Top 8 subjects</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Medal className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Overall Position</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{overallPosition}</div>
            <div className="text-xs text-slate-500 mt-1">out of {totalStudentsInForm}</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Stream Position</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{streamPosition}</div>
            <div className="text-xs text-slate-500 mt-1">out of {totalStudentsInStream}</div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Percentage</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{percentageScore}%</div>
            <div className="text-xs text-slate-500 mt-1">{totalMarks}/{totalPossible}</div>
          </div>
        </div>

        {/* Subjects Performance Table */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Subject Performance - {selectedTerm} {selectedYear}</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">CAT (30)</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">Exam (70)</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">Total (100)</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">Grade</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">Points</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">Position</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">Trend</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Teacher's Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentSubjects.map((subject, index) => {
                  const gradeInfo = getGrade(subject.totalMarks);
                  return (
                    <tr 
                      key={index} 
                      className="border-t border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-800">{subject.name}</div>
                        <div className="text-xs text-slate-500">{subject.teacher}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-mono text-sm font-medium text-slate-700">
                          {subject.catMarks}/{subject.catOutOf}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-mono text-sm font-medium text-slate-700">
                          {subject.examMarks}/{subject.examOutOf}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-lg font-bold text-slate-800">
                            {subject.totalMarks}
                          </span>
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${gradeInfo.color} transition-all duration-1000 ease-out`}
                              style={{ width: `${(subject.totalMarks / subject.totalOutOf) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradeInfo.color} flex items-center justify-center shadow-md`}>
                            <span className="text-lg font-bold text-white">{gradeInfo.grade}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-mono text-sm font-semibold text-slate-700">{gradeInfo.points}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-mono text-sm font-semibold text-indigo-600">{subject.positionInSubject}</span>
                      </td>
                      <td className="px-4 py-4">
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
                      <td className="px-4 py-4">
                        <span className="text-sm text-slate-600">{subject.remarks}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Grading Key */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Grading System (KNEC)</h4>
            <div className="grid grid-cols-6 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs">A</div>
                <span className="text-slate-600">80-100 (12pts)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">B</div>
                <span className="text-slate-600">60-79 (8-10pts)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">C</div>
                <span className="text-slate-600">45-59 (5-7pts)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xs">D</div>
                <span className="text-slate-600">30-44 (2-4pts)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-xs">E</div>
                <span className="text-slate-600">0-29 (1pt)</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-600">
              <span className="font-semibold">Note:</span> CAT = Continuous Assessment Test (30 marks) | End Term Exam (70 marks) | Total (100 marks)
            </div>
          </div>
        </div>

        {/* Remarks Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Class Teacher's Remarks */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Class Teacher's Remarks</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Excellent overall performance this term. Shows strong understanding across all subjects, particularly in sciences and computer studies. 
              Consistent effort and dedication evident in all assessments. Continue to maintain this excellent standard. Well done!
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm font-semibold text-slate-800">Mrs. Margaret Njeri</p>
              <p className="text-xs text-slate-600">Class Teacher - Form 3 Science</p>
              <p className="text-xs text-slate-500 font-mono mt-1">Date: 15/12/2024</p>
            </div>
          </div>

          {/* Principal's Remarks */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Principal's Remarks</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Commendable performance. The student has shown remarkable academic excellence and maintains a good position in class. 
              Keep up the exemplary work and continue striving for academic excellence. Promoted to next term.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm font-semibold text-slate-800">Mr. John Kariuki, M.Ed</p>
              <p className="text-xs text-slate-600">School Principal</p>
              <p className="text-xs text-slate-500 font-mono mt-1">Signature: _______________</p>
            </div>
          </div>
        </div>

        {/* Term Dates and Next Term */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Term Closing Date</p>
              <p className="text-xs text-slate-600">Friday, 20th December 2024</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Next Term Opens</p>
              <p className="text-xs text-slate-600">Monday, 6th January 2025</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">School Fees Balance</p>
              <p className="text-xs text-slate-600">Ksh. 0.00 (Cleared)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;