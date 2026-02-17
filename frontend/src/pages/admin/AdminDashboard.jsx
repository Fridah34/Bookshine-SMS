import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserCheck,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Award,
  Clock,
  FileText,
  Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  // Dashboard statistics
  const stats = [
    {
      title: 'Total Students',
      value: '1,248',
      change: '+12',
      changeType: 'increase',
      icon: Users,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Total Teachers',
      value: '64',
      change: '+3',
      changeType: 'increase',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Classes',
      value: '32',
      change: '0',
      changeType: 'neutral',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Attendance Today',
      value: '94.5%',
      change: '+2.3%',
      changeType: 'increase',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'New student registered',
      student: 'John Mwangi - Form 1A',
      time: '10 minutes ago',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      id: 2,
      action: 'Exam marks submitted',
      student: 'Mathematics - Form 3B',
      time: '25 minutes ago',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      action: 'Fee payment received',
      student: 'Jane Wanjiru - KES 15,000',
      time: '1 hour ago',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      action: 'Attendance marked',
      student: 'Form 2C - 42/45 present',
      time: '2 hours ago',
      icon: UserCheck,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      id: 5,
      action: 'Library book issued',
      student: 'Chemistry Textbook - David Ochieng',
      time: '3 hours ago',
      icon: FileText,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      id: 6,
      action: 'Teacher assigned',
      student: 'Mrs. Kamau - Mathematics Form 2A',
      time: '4 hours ago',
      icon: GraduationCap,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      id: 7,
      action: 'Report card generated',
      student: 'Form 4B - Mid-Term Results',
      time: '5 hours ago',
      icon: FileText,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      id: 8,
      action: 'Timetable updated',
      student: 'Science Stream - Week 12',
      time: '6 hours ago',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  // Quick stats for forms
  const formStats = [
    { form: 'Form 1', students: 320, boys: 165, girls: 155, streams: 8 },
    { form: 'Form 2', students: 315, boys: 160, girls: 155, streams: 8 },
    { form: 'Form 3', students: 308, boys: 158, girls: 150, streams: 8 },
    { form: 'Form 4', students: 305, boys: 155, girls: 150, streams: 8 }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Mid-Term Exams',
      date: '2024-12-18',
      type: 'Academic',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Forms 1-4 examinations begin'
    },
    {
      id: 2,
      title: 'Parents Meeting',
      date: '2024-12-20',
      type: 'Event',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Academic progress discussion'
    },
    {
      id: 3,
      title: 'Term Closing',
      date: '2024-12-22',
      type: 'Academic',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'End of Term 2, 2024'
    },
    {
      id: 4,
      title: 'Staff Meeting',
      date: '2024-12-16',
      type: 'Administrative',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Monthly staff briefing'
    },
    {
      id: 5,
      title: 'Sports Day',
      date: '2024-12-21',
      type: 'Event',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Inter-house competitions'
    },
    {
      id: 6,
      title: 'Form 4 Graduation',
      date: '2024-12-23',
      type: 'Event',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'KCSE candidates send-off'
    }
  ];

  // Performance alerts
  const alerts = [
    {
      id: 1,
      message: '12 students with fee balances exceeding KES 20,000',
      severity: 'warning',
      icon: AlertCircle
    },
    {
      id: 2,
      message: '5 students with attendance below 75%',
      severity: 'error',
      icon: UserCheck
    },
    {
      id: 3,
      message: 'Form 4 KCSE registration deadline in 15 days',
      severity: 'info',
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                {stat.changeType === 'increase' ? (
                  <span className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                    <TrendingUp size={16} />
                    {stat.change}
                  </span>
                ) : stat.changeType === 'decrease' ? (
                  <span className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                    <TrendingDown size={16} />
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-slate-400 text-sm">—</span>
                )}
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  alert.severity === 'error'
                    ? 'bg-red-50 border-red-200'
                    : alert.severity === 'warning'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <Icon
                  className={
                    alert.severity === 'error'
                      ? 'text-red-600'
                      : alert.severity === 'warning'
                      ? 'text-amber-600'
                      : 'text-blue-600'
                  }
                  size={20}
                />
                <p
                  className={`font-medium ${
                    alert.severity === 'error'
                      ? 'text-red-800'
                      : alert.severity === 'warning'
                      ? 'text-amber-800'
                      : 'text-blue-800'
                  }`}
                >
                  {alert.message}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Statistics */}
        <div className="lg:col-span-2 space-y-8">
          {/* Student Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Student Distribution by Form</h3>
            <div className="space-y-4">
              {formStats.map((form, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-800 text-lg">{form.form}</h4>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      {form.students} Students
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Boys</p>
                      <p className="font-semibold text-slate-800">{form.boys}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Girls</p>
                      <p className="font-semibold text-slate-800">{form.girls}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Streams</p>
                      <p className="font-semibold text-slate-800">{form.streams}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Activities</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0">
                    <div className={`w-8 h-8 rounded-lg ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={activity.color} size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{activity.action}</p>
                      <p className="text-xs text-slate-600">{activity.student}</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-4 rounded-lg ${event.bgColor} border border-opacity-20`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${event.color}`}>{event.title}</p>
                      <p className="text-xs text-slate-600 mt-1">{event.description}</p>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 ml-2">
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <span className="inline-block px-2 py-1 bg-white bg-opacity-50 rounded text-xs font-medium text-slate-700">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;