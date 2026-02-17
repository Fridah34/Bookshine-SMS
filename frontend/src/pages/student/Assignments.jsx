import React, { useState } from 'react';
import { ClipboardCheck, Calendar, Clock, AlertCircle, CheckCircle, FileText, BookOpen, ArrowLeft, ChevronRight } from 'lucide-react';

const Assignments = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Realistic Kenyan high school assignments
  const assignments = [
    {
      id: 1,
      title: 'Mathematics Assignment',
      subject: 'Mathematics',
      teacher: 'Mr. Kimani',
      instruction: 'Complete Exercise 8.2 from KLB Mathematics Form 3 textbook, Questions 1-15. Show all working.',
      dueDate: '2024-12-20',
      assignedDate: '2024-12-13',
      status: 'pending',
      priority: 'high',
      type: 'Textbook Exercise',
      color: 'from-blue-500 to-cyan-500',
      textbookReference: 'KLB Mathematics Form 3, Page 156-158, Exercise 8.2',
      notes: 'Focus on sine and cosine rules. Remember to label all diagrams clearly.'
    },
    {
      id: 2,
      title: 'English Composition',
      subject: 'English',
      teacher: 'Mrs. Wanjiru',
      instruction: 'Write a 450-word descriptive essay on the topic: "A Busy Market Day". Use descriptive language and proper grammar.',
      dueDate: '2024-12-22',
      assignedDate: '2024-12-14',
      status: 'in-progress',
      priority: 'high',
      type: 'Essay',
      color: 'from-purple-500 to-pink-500',
      textbookReference: 'Essay writing guidelines from class notes',
      notes: 'Introduction, body (3 paragraphs), conclusion. Check grammar and spelling before submission.'
    },
    {
      id: 3,
      title: 'Kiswahili Insha',
      subject: 'Kiswahili',
      teacher: 'Mwalimu Omondi',
      instruction: 'Andika barua rasmi kwa mkurugenzi wa shule yako ukiomba ruhusa ya kuhudhuria mazishi ya jamaa yako.',
      dueDate: '2024-12-21',
      assignedDate: '2024-12-12',
      status: 'submitted',
      priority: 'medium',
      type: 'Insha',
      color: 'from-green-500 to-emerald-500',
      textbookReference: 'Muundo wa barua rasmi - Class notes',
      notes: 'Tumia muundo sahihi wa barua rasmi. Angalia makosa ya tahajia.'
    },
    {
      id: 4,
      title: 'Chemistry Lab Report',
      subject: 'Chemistry',
      teacher: 'Dr. Mwangi',
      instruction: 'Write a practical report on the acid-base titration experiment done in class. Include aim, apparatus, procedure, results, and conclusion.',
      dueDate: '2024-12-20',
      assignedDate: '2024-12-11',
      status: 'submitted',
      priority: 'high',
      type: 'Lab Report',
      color: 'from-orange-500 to-amber-500',
      textbookReference: 'Practical notebook - Experiment 12',
      notes: 'Use the standard lab report format. Include all observations and calculations.'
    },
    {
      id: 5,
      title: 'Physics Problems',
      subject: 'Physics',
      teacher: 'Mr. Njoroge',
      instruction: 'Solve problems 1-20 on Ohm\'s Law and electrical circuits from the textbook page 210.',
      dueDate: '2024-12-19',
      assignedDate: '2024-12-10',
      status: 'overdue',
      priority: 'high',
      type: 'Problem Set',
      color: 'from-indigo-500 to-purple-500',
      textbookReference: 'KLB Physics Form 3, Page 210, Questions 1-20',
      notes: 'Show all calculations. Draw circuit diagrams where necessary.'
    },
    {
      id: 6,
      title: 'Biology Diagrams',
      subject: 'Biology',
      teacher: 'Mrs. Akinyi',
      instruction: 'Draw and label: (1) Human digestive system, (2) Plant cell, (3) Human heart. Use your textbook for reference.',
      dueDate: '2024-12-23',
      assignedDate: '2024-12-15',
      status: 'pending',
      priority: 'medium',
      type: 'Diagrams',
      color: 'from-teal-500 to-cyan-500',
      textbookReference: 'KLB Biology Form 3, Pages 45, 78, 102',
      notes: 'Use pencil for diagrams. Label all parts clearly. Include functions for each organ.'
    },
    {
      id: 7,
      title: 'History Essay',
      subject: 'History & Government',
      teacher: 'Mr. Mutua',
      instruction: 'Write an essay (600 words) on: "Discuss the effects of colonial rule on the economy of Kenya."',
      dueDate: '2024-12-22',
      assignedDate: '2024-12-13',
      status: 'in-progress',
      priority: 'medium',
      type: 'Essay',
      color: 'from-red-500 to-rose-500',
      textbookReference: 'History textbook Chapter 9-10',
      notes: 'Include: Introduction, positive effects, negative effects, conclusion. Give specific examples.'
    },
    {
      id: 8,
      title: 'Geography Map Work',
      subject: 'Geography',
      teacher: 'Mrs. Chepkemoi',
      instruction: 'Complete the topographic map questions 1-8 from your workbook. Calculate distances, heights, and draw cross-sections.',
      dueDate: '2024-12-20',
      assignedDate: '2024-12-12',
      status: 'pending',
      priority: 'high',
      type: 'Map Work',
      color: 'from-emerald-500 to-green-600',
      textbookReference: 'Geography Workbook, Map Exercise 5',
      notes: 'Use a ruler and pencil. Show all calculations for distances and heights.'
    },
    {
      id: 9,
      title: 'Business Studies Case Study',
      subject: 'Business Studies',
      teacher: 'Mr. Otieno',
      instruction: 'Read the case study on page 89 about Safaricom Ltd. Answer questions 1-6 at the end of the case study.',
      dueDate: '2024-12-21',
      assignedDate: '2024-12-14',
      status: 'pending',
      priority: 'low',
      type: 'Case Study',
      color: 'from-yellow-500 to-amber-500',
      textbookReference: 'Business Studies Form 3, Page 89-92',
      notes: 'Give detailed answers with examples from the case study.'
    },
    {
      id: 10,
      title: 'Computer Studies Practical',
      subject: 'Computer Studies',
      teacher: 'Ms. Waithera',
      instruction: 'Create a spreadsheet showing your family budget for one month. Include income, expenses, and calculate savings. Use formulas.',
      dueDate: '2024-12-23',
      assignedDate: '2024-12-15',
      status: 'pending',
      priority: 'medium',
      type: 'Practical Work',
      color: 'from-violet-500 to-purple-500',
      textbookReference: 'MS Excel practical notes',
      notes: 'Use SUM, AVERAGE formulas. Format the spreadsheet properly. Save as: YourName_Budget.xlsx'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (filterStatus === 'all') return true;
    return assignment.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'submitted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    due.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const diff = due - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  };

  const statusCounts = {
    all: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    'in-progress': assignments.filter(a => a.status === 'in-progress').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    overdue: assignments.filter(a => a.status === 'overdue').length
  };

  // List View
  if (!selectedAssignment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Assignments
            </h1>
            <p className="text-slate-600 text-lg">
              Track your homework and submissions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'All', value: statusCounts.all, status: 'all', color: 'from-gray-500 to-slate-500' },
              { label: 'Pending', value: statusCounts.pending, status: 'pending', color: 'from-yellow-500 to-amber-500' },
              { label: 'In Progress', value: statusCounts['in-progress'], status: 'in-progress', color: 'from-blue-500 to-cyan-500' },
              { label: 'Submitted', value: statusCounts.submitted, status: 'submitted', color: 'from-green-500 to-emerald-500' },
              { label: 'Overdue', value: statusCounts.overdue, status: 'overdue', color: 'from-red-500 to-rose-500' }
            ].map((stat) => (
              <button
                key={stat.status}
                onClick={() => setFilterStatus(stat.status)}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  filterStatus === stat.status
                    ? `bg-gradient-to-br ${stat.color} text-white shadow-xl scale-105`
                    : 'bg-white/70 backdrop-blur-lg border border-white/80 text-slate-700 hover:shadow-lg hover:scale-105'
                }`}
              >
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm font-medium">{stat.label}</p>
              </button>
            ))}
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment, index) => (
              <div
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment)}
                className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Left: Subject Badge and Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${assignment.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{assignment.title}</h3>
                          <p className="text-sm text-slate-600">{assignment.subject} • {assignment.teacher}</p>
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm mb-3 line-clamp-2">{assignment.instruction}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{getDaysUntilDue(assignment.dueDate)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Clock className="w-4 h-4" />
                          {new Date(assignment.dueDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority.toUpperCase()} PRIORITY
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                          {assignment.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div className="flex flex-col items-end justify-between">
                    <span className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 ${getStatusColor(assignment.status)}`}>
                      {assignment.status === 'in-progress' ? 'In Progress' : 
                       assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                    <ChevronRight className="w-6 h-6 text-slate-400 mt-2" />
                  </div>
                </div>
              </div>
            ))}

            {filteredAssignments.length === 0 && (
              <div className="text-center py-12 bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl">
                <ClipboardCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No assignments found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detail View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setSelectedAssignment(null)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-lg border border-white/80 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-indigo-600" />
          <span className="font-medium text-slate-700">Back to Assignments</span>
        </button>

        {/* Assignment Header */}
        <div className={`bg-gradient-to-br ${selectedAssignment.color} rounded-2xl p-8 shadow-xl mb-8 text-white`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{selectedAssignment.title}</h1>
              <p className="text-white/90 text-lg">{selectedAssignment.subject}</p>
              <p className="text-white/80">Teacher: {selectedAssignment.teacher}</p>
            </div>
            <span className={`px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold border border-white/30`}>
              {selectedAssignment.type}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold`}>
              {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
            </span>
            <span className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold`}>
              {selectedAssignment.priority.toUpperCase()} Priority
            </span>
          </div>
        </div>

        {/* Due Date Alert */}
        <div className={`p-4 rounded-xl border-2 mb-8 ${
          selectedAssignment.status === 'overdue'
            ? 'bg-red-50 border-red-200'
            : getDaysUntilDue(selectedAssignment.dueDate).includes('today')
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            <AlertCircle className={`w-6 h-6 ${
              selectedAssignment.status === 'overdue'
                ? 'text-red-600'
                : getDaysUntilDue(selectedAssignment.dueDate).includes('today')
                ? 'text-yellow-600'
                : 'text-blue-600'
            }`} />
            <div>
              <p className="font-bold text-slate-800 text-lg">
                {getDaysUntilDue(selectedAssignment.dueDate)}
              </p>
              <p className="text-sm text-slate-600">
                Due: {new Date(selectedAssignment.dueDate).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Assignment Details */}
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Instructions</h3>
            <p className="text-slate-700 leading-relaxed">{selectedAssignment.instruction}</p>
          </div>

          {/* Textbook Reference */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Textbook Reference</h3>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-slate-700 font-medium">{selectedAssignment.textbookReference}</p>
            </div>
          </div>

          {/* Teacher's Notes */}
          {selectedAssignment.notes && (
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Teacher's Notes</h3>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">{selectedAssignment.notes}</p>
              </div>
            </div>
          )}

          {/* Assignment Info */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Assignment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-1">Assigned Date</p>
                <p className="font-semibold text-slate-800">
                  {new Date(selectedAssignment.assignedDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-1">Due Date</p>
                <p className="font-semibold text-slate-800">
                  {new Date(selectedAssignment.dueDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {selectedAssignment.status === 'submitted' && (
            <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <p className="font-bold text-lg">Assignment Submitted</p>
                  <p className="text-sm text-green-600">Your work has been submitted to {selectedAssignment.teacher} for marking.</p>
                </div>
              </div>
            </div>
          )}

          {/* Reminder Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Reminder</p>
                <p className="text-xs text-amber-800">
                  All assignments must be written in your exercise book and submitted to your teacher. Make sure your work is neat and clearly labeled with your name and admission number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;