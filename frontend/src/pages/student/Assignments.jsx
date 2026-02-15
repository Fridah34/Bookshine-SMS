import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Calendar,
  Clock,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  FileText,
  Upload,
  Eye
} from 'lucide-react';

const Assignments = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Mock data
  const assignments = [
    {
      id: 1,
      title: 'Calculus Problem Set 5',
      course: 'Advanced Mathematics',
      courseCode: 'MATH-401',
      teacher: 'Dr. Sarah Johnson',
      description: 'Complete problems 1-20 from Chapter 5. Show all work and provide detailed explanations for each solution.',
      dueDate: '2026-02-18',
      dueTime: '11:59 PM',
      submittedDate: null,
      status: 'pending',
      priority: 'high',
      points: 50,
      earnedPoints: null,
      type: 'Problem Set',
      instructions: [
        'Show all work clearly',
        'Write solutions on separate paper',
        'Scan and upload as PDF',
        'Check answers before submitting'
      ],
      attachments: [
        { name: 'Problem Set 5.pdf', size: '1.2 MB' }
      ]
    },
    {
      id: 2,
      title: 'Physics Lab Report 3',
      course: 'Physics',
      courseCode: 'PHY-301',
      teacher: 'Prof. Michael Chen',
      description: 'Write a comprehensive lab report on the pendulum experiment conducted in class. Include data analysis and conclusions.',
      dueDate: '2026-02-20',
      dueTime: '11:59 PM',
      submittedDate: '2026-02-19',
      status: 'submitted',
      priority: 'medium',
      points: 100,
      earnedPoints: null,
      type: 'Lab Report',
      instructions: [
        'Follow lab report format',
        'Include graphs and tables',
        'Minimum 5 pages',
        'Cite all sources'
      ],
      attachments: [
        { name: 'Lab Instructions.pdf', size: '890 KB' },
        { name: 'Data Sheet.xlsx', size: '45 KB' }
      ]
    },
    {
      id: 3,
      title: 'Shakespeare Essay',
      course: 'English Literature',
      courseCode: 'ENG-401',
      teacher: 'Ms. Emily Brown',
      description: 'Write a 5-page essay analyzing the themes of love and betrayal in "Othello". Include at least 5 scholarly sources.',
      dueDate: '2026-02-22',
      dueTime: '11:59 PM',
      submittedDate: null,
      status: 'in-progress',
      priority: 'high',
      points: 150,
      earnedPoints: null,
      type: 'Essay',
      instructions: [
        'MLA format required',
        '5-7 pages double-spaced',
        'Include works cited page',
        'Use scholarly sources only'
      ],
      attachments: [
        { name: 'Essay Guidelines.pdf', size: '650 KB' },
        { name: 'Citation Guide.pdf', size: '320 KB' }
      ]
    },
    {
      id: 4,
      title: 'Chemical Reactions Quiz',
      course: 'Chemistry',
      courseCode: 'CHEM-301',
      teacher: 'Dr. Robert Wilson',
      description: 'Complete the online quiz covering chapters 6-8. You will have 45 minutes to complete 25 multiple choice questions.',
      dueDate: '2026-02-16',
      dueTime: '2:00 PM',
      submittedDate: '2026-02-15',
      status: 'graded',
      priority: 'low',
      points: 50,
      earnedPoints: 47,
      type: 'Quiz',
      instructions: [
        'Single attempt only',
        '45 minute time limit',
        'No notes allowed',
        'Must complete in one sitting'
      ],
      attachments: []
    },
    {
      id: 5,
      title: 'World War II Research Paper',
      course: 'World History',
      courseCode: 'HIST-301',
      teacher: 'Mr. David Martinez',
      description: 'Research and write a 10-page paper on a specific aspect of World War II. Choose from approved topics list.',
      dueDate: '2026-02-28',
      dueTime: '11:59 PM',
      submittedDate: null,
      status: 'pending',
      priority: 'medium',
      points: 200,
      earnedPoints: null,
      type: 'Research Paper',
      instructions: [
        'Chicago style citations',
        '10-12 pages',
        'Minimum 8 sources',
        'Include primary sources',
        'Topic must be approved'
      ],
      attachments: [
        { name: 'Topic List.pdf', size: '450 KB' },
        { name: 'Research Guidelines.pdf', size: '780 KB' }
      ]
    },
    {
      id: 6,
      title: 'Python Programming Project',
      course: 'Computer Science',
      courseCode: 'CS-201',
      teacher: 'Ms. Lisa Park',
      description: 'Create a working calculator application using Python. Must include all basic operations and handle errors properly.',
      dueDate: '2026-02-24',
      dueTime: '11:59 PM',
      submittedDate: null,
      status: 'in-progress',
      priority: 'high',
      points: 100,
      earnedPoints: null,
      type: 'Programming Project',
      instructions: [
        'Use Python 3.x',
        'Include comments in code',
        'Test all functions',
        'Submit as .py file',
        'Include README'
      ],
      attachments: [
        { name: 'Project Requirements.pdf', size: '1.1 MB' },
        { name: 'Starter Code.zip', size: '15 KB' }
      ]
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = filterStatus === 'all' || assignment.status === filterStatus;
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'submitted':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'graded':
        return 'bg-green-100 text-green-700 border-green-200';
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
    const diff = due - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  };

  const statusCounts = {
    all: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    'in-progress': assignments.filter(a => a.status === 'in-progress').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
        <p className="text-gray-600 mt-1">
          Track and submit your assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'All', value: statusCounts.all, status: 'all', color: 'bg-gray-100' },
          { label: 'Pending', value: statusCounts.pending, status: 'pending', color: 'bg-yellow-100' },
          { label: 'In Progress', value: statusCounts['in-progress'], status: 'in-progress', color: 'bg-blue-100' },
          { label: 'Submitted', value: statusCounts.submitted, status: 'submitted', color: 'bg-purple-100' },
          { label: 'Graded', value: statusCounts.graded, status: 'graded', color: 'bg-green-100' }
        ].map((stat) => (
          <button
            key={stat.status}
            onClick={() => setFilterStatus(stat.status)}
            className={`p-4 rounded-xl transition-all ${
              filterStatus === stat.status
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : `${stat.color} text-gray-700 hover:shadow-md`
            }`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedAssignment(assignment)}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left: Assignment Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">
                      {assignment.course} • {assignment.courseCode}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                    {assignment.priority.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {assignment.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {getDaysUntilDue(assignment.dueDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {new Date(assignment.dueDate).toLocaleDateString()} at {assignment.dueTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClipboardCheck size={16} />
                    {assignment.points} points
                  </div>
                  {assignment.attachments.length > 0 && (
                    <div className="flex items-center gap-1">
                      <FileText size={16} />
                      {assignment.attachments.length} attachment{assignment.attachments.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Status and Actions */}
              <div className="flex flex-col items-end justify-between gap-2">
                <span className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(assignment.status)}`}>
                  {assignment.status === 'in-progress' ? 'In Progress' : 
                   assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>

                {assignment.status === 'graded' && assignment.earnedPoints && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {assignment.earnedPoints}/{assignment.points}
                    </p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                )}

                {assignment.status === 'submitted' && (
                  <div className="flex items-center gap-2 text-purple-600">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Submitted</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <ClipboardCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No assignments found</p>
          </div>
        )}
      </div>

      {/* Assignment Detail Modal */}
      {selectedAssignment && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAssignment(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedAssignment.title}</h2>
                  <p className="text-white/90">{selectedAssignment.course}</p>
                  <p className="text-white/80 text-sm">Teacher: {selectedAssignment.teacher}</p>
                </div>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAssignment.status)} bg-white/20 border-white/30`}>
                  {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {selectedAssignment.type}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {selectedAssignment.points} points
                </span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Due Date Alert */}
              <div className={`p-4 rounded-lg border ${
                getDaysUntilDue(selectedAssignment.dueDate).includes('Overdue')
                  ? 'bg-red-50 border-red-200'
                  : getDaysUntilDue(selectedAssignment.dueDate).includes('today')
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-3">
                  <AlertCircle className={
                    getDaysUntilDue(selectedAssignment.dueDate).includes('Overdue')
                      ? 'text-red-600'
                      : getDaysUntilDue(selectedAssignment.dueDate).includes('today')
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  } />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {getDaysUntilDue(selectedAssignment.dueDate)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedAssignment.dueDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} at {selectedAssignment.dueTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedAssignment.description}</p>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Instructions</h3>
                <ul className="space-y-2">
                  {selectedAssignment.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Attachments */}
              {selectedAssignment.attachments.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {selectedAssignment.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <Eye className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submission Status */}
              {selectedAssignment.submittedDate && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle size={20} />
                    <span className="font-semibold">Submitted</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Submitted on {new Date(selectedAssignment.submittedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {/* Grade Display */}
              {selectedAssignment.status === 'graded' && selectedAssignment.earnedPoints !== null && (
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Your Score</p>
                    <p className="text-5xl font-bold text-green-600">
                      {selectedAssignment.earnedPoints}/{selectedAssignment.points}
                    </p>
                    <p className="text-lg text-gray-700 mt-2">
                      {Math.round((selectedAssignment.earnedPoints / selectedAssignment.points) * 100)}%
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {!selectedAssignment.submittedDate && selectedAssignment.status !== 'graded' && (
                <button className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2">
                  <Upload size={20} />
                  Submit Assignment
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Assignments ;