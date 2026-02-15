import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  FileText,
  TrendingUp,
  ChevronRight,
  Star,
  Download,
  ExternalLink
} from 'lucide-react';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock data - replace with API call
  const courses = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      code: 'MATH-401',
      teacher: 'Dr. Sarah Johnson',
      room: 'Room 301',
      schedule: 'Mon, Wed, Fri - 8:00 AM',
      grade: 88,
      credits: 4,
      progress: 75,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      students: 28,
      description: 'Advanced calculus and mathematical analysis',
      topics: ['Calculus', 'Linear Algebra', 'Differential Equations', 'Statistics'],
      nextClass: '2026-02-15 08:00',
      materials: [
        { name: 'Course Syllabus', type: 'PDF', size: '2.4 MB' },
        { name: 'Chapter 5 Notes', type: 'PDF', size: '1.8 MB' },
        { name: 'Practice Problems', type: 'PDF', size: '890 KB' }
      ],
      upcomingAssignments: [
        { title: 'Problem Set 5', due: '2026-02-18', grade: null },
        { title: 'Midterm Exam', due: '2026-02-25', grade: null }
      ]
    },
    {
      id: 2,
      name: 'Physics',
      code: 'PHY-301',
      teacher: 'Prof. Michael Chen',
      room: 'Lab 2',
      schedule: 'Tue, Thu - 11:00 AM',
      grade: 92,
      credits: 4,
      progress: 68,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      students: 24,
      description: 'Classical mechanics and thermodynamics',
      topics: ['Mechanics', 'Energy', 'Waves', 'Thermodynamics'],
      nextClass: '2026-02-16 11:00',
      materials: [
        { name: 'Lab Manual', type: 'PDF', size: '5.2 MB' },
        { name: 'Safety Guidelines', type: 'PDF', size: '1.1 MB' }
      ],
      upcomingAssignments: [
        { title: 'Lab Report 3', due: '2026-02-20', grade: null }
      ]
    },
    {
      id: 3,
      name: 'English Literature',
      code: 'ENG-401',
      teacher: 'Ms. Emily Brown',
      room: 'Room 205',
      schedule: 'Mon, Wed, Fri - 2:00 PM',
      grade: 85,
      credits: 3,
      progress: 80,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      students: 30,
      description: 'Analysis of classical and contemporary literature',
      topics: ['Shakespeare', 'Modern Poetry', 'Critical Analysis', 'Essay Writing'],
      nextClass: '2026-02-15 14:00',
      materials: [
        { name: 'Reading List', type: 'PDF', size: '450 KB' },
        { name: 'Essay Guidelines', type: 'PDF', size: '780 KB' }
      ],
      upcomingAssignments: [
        { title: 'Shakespeare Essay', due: '2026-02-22', grade: null },
        { title: 'Poetry Analysis', due: '2026-03-01', grade: null }
      ]
    },
    {
      id: 4,
      name: 'Chemistry',
      code: 'CHEM-301',
      teacher: 'Dr. Robert Wilson',
      room: 'Lab 1',
      schedule: 'Tue, Thu - 9:00 AM',
      grade: 90,
      credits: 4,
      progress: 72,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      students: 26,
      description: 'Organic chemistry and chemical reactions',
      topics: ['Organic Chemistry', 'Chemical Bonding', 'Reactions', 'Lab Techniques'],
      nextClass: '2026-02-16 09:00',
      materials: [
        { name: 'Lab Safety Manual', type: 'PDF', size: '3.2 MB' },
        { name: 'Periodic Table Guide', type: 'PDF', size: '1.5 MB' }
      ],
      upcomingAssignments: [
        { title: 'Lab Practical', due: '2026-02-19', grade: null }
      ]
    },
    {
      id: 5,
      name: 'World History',
      code: 'HIST-301',
      teacher: 'Mr. David Martinez',
      room: 'Room 401',
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      grade: 87,
      credits: 3,
      progress: 65,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      students: 32,
      description: '20th century world history and global conflicts',
      topics: ['World Wars', 'Cold War', 'Modern Politics', 'Cultural Movements'],
      nextClass: '2026-02-15 10:00',
      materials: [
        { name: 'Timeline Resources', type: 'PDF', size: '2.8 MB' },
        { name: 'Primary Sources', type: 'PDF', size: '4.1 MB' }
      ],
      upcomingAssignments: [
        { title: 'Research Paper', due: '2026-02-28', grade: null }
      ]
    },
    {
      id: 6,
      name: 'Computer Science',
      code: 'CS-201',
      teacher: 'Ms. Lisa Park',
      room: 'Computer Lab',
      schedule: 'Tue, Thu - 1:00 PM',
      grade: 94,
      credits: 3,
      progress: 78,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      students: 22,
      description: 'Introduction to programming and algorithms',
      topics: ['Python', 'Data Structures', 'Algorithms', 'Web Development'],
      nextClass: '2026-02-16 13:00',
      materials: [
        { name: 'Python Basics', type: 'PDF', size: '1.9 MB' },
        { name: 'Code Examples', type: 'ZIP', size: '3.5 MB' }
      ],
      upcomingAssignments: [
        { title: 'Python Project', due: '2026-02-24', grade: null }
      ]
    }
  ];

  const getNextClassTime = (dateString) => {
    const classDate = new Date(dateString);
    const now = new Date();
    const diff = classDate - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    return 'soon';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
          <p className="text-gray-600 mt-1">
            You're enrolled in {courses.length} courses this semester
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-purple-50 rounded-lg">
            <span className="text-sm text-gray-600">Total Credits: </span>
            <span className="font-bold text-purple-600">
              {courses.reduce((sum, course) => sum + course.credits, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCourse(course)}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
          >
            {/* Course Header */}
            <div className={`h-32 bg-gradient-to-br ${course.color} p-6 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-bold text-lg">{course.name}</h3>
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs">
                    {course.code}
                  </span>
                </div>
                <p className="text-white/90 text-sm">{course.teacher}</p>
              </div>
            </div>

            {/* Course Body */}
            <div className="p-6">
              {/* Grade & Progress */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Current Grade</p>
                  <p className="text-2xl font-bold text-gray-800">{course.grade}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-lg font-semibold text-purple-600">{course.progress}%</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${course.color}`}
                  />
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2" />
                  {course.schedule}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={16} className="mr-2" />
                  {course.students} students
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  Next class {getNextClassTime(course.nextClass)}
                </div>
              </div>

              {/* View Details Button */}
              <button className="w-full py-2 px-4 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-purple-600 group-hover:text-white">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-br ${selectedCourse.color} p-8 text-white`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedCourse.name}</h2>
                  <p className="text-white/90">{selectedCourse.code}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-white/90">{selectedCourse.description}</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedCourse.grade}%</p>
                  <p className="text-sm text-gray-600">Grade</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedCourse.credits}</p>
                  <p className="text-sm text-gray-600">Credits</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedCourse.students}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <FileText className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedCourse.progress}%</p>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
              </div>

              {/* Topics Covered */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Materials */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Course Materials</h3>
                <div className="space-y-2">
                  {selectedCourse.materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{material.name}</p>
                          <p className="text-sm text-gray-500">{material.type} • {material.size}</p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Assignments */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Assignments</h3>
                <div className="space-y-2">
                  {selectedCourse.upcomingAssignments.map((assignment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{assignment.title}</p>
                        <p className="text-sm text-gray-600">
                          Due: {new Date(assignment.due).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Courses ;