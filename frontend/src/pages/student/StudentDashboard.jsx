import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  Target
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - replace with API calls
  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: '6',
      change: '+2 this semester',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: ClipboardCheck,
      label: 'Assignments',
      value: '12',
      change: '3 pending',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Overall Grade',
      value: '85%',
      change: '+5% from last month',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: Users,
      label: 'Attendance',
      value: '92%',
      change: '23/25 classes',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const upcomingClasses = [
    {
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      time: '09:00 AM',
      room: 'Room 301',
      status: 'upcoming'
    },
    {
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      time: '11:00 AM',
      room: 'Lab 2',
      status: 'upcoming'
    },
    {
      subject: 'English Literature',
      teacher: 'Ms. Emily Brown',
      time: '02:00 PM',
      room: 'Room 205',
      status: 'upcoming'
    },
  ];

  const recentAssignments = [
    {
      title: 'Calculus Problem Set 5',
      course: 'Mathematics',
      dueDate: '2026-02-15',
      status: 'pending',
      priority: 'high'
    },
    {
      title: 'Physics Lab Report',
      course: 'Physics',
      dueDate: '2026-02-18',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      title: 'Essay: Shakespeare Analysis',
      course: 'English',
      dueDate: '2026-02-20',
      status: 'pending',
      priority: 'low'
    },
  ];

  const achievements = [
    { title: 'Perfect Attendance', icon: Award, color: 'text-yellow-500' },
    { title: 'Top Performer', icon: Target, color: 'text-purple-500' },
    { title: 'Assignment Master', icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-400 rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-purple-100">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-200">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-2xl font-bold">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={stat.textColor} size={24} />
              </div>
              <span className="text-xs text-gray-500">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="text-purple-600" size={24} />
              Today's Schedule
            </h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-lg border border-purple-100 hover:border-purple-300 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex flex-col items-center justify-center text-white">
                  <Clock size={20} />
                  <span className="text-xs mt-1">{cls.time}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{cls.subject}</h3>
                  <p className="text-sm text-gray-600">{cls.teacher}</p>
                  <p className="text-xs text-gray-500 mt-1">{cls.room}</p>
                </div>
                <div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Upcoming
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="text-purple-600" size={24} />
            Achievements
          </h2>

          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
              >
                <achievement.icon className={achievement.color} size={32} />
                <span className="font-medium text-gray-700">{achievement.title}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg text-white text-center">
            <p className="text-2xl font-bold">1,250</p>
            <p className="text-sm text-purple-200">Total Points Earned</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Assignments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ClipboardCheck className="text-purple-600" size={24} />
            Recent Assignments
          </h2>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assignment</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Priority</th>
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((assignment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-800">{assignment.title}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{assignment.course}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {assignment.status === 'pending' ? 'Pending' : 'In Progress'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : assignment.priority === 'medium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;