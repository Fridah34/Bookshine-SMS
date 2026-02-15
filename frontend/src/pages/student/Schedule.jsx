import React, { useState } from 'react';
import { Clock, BookOpen, Users, MapPin, Bell, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Realistic high school schedule data
  const schedule = {
    Monday: [
      { 
        period: 1, 
        time: '8:00 - 8:50', 
        subject: 'AP Calculus BC', 
        teacher: 'Ms. Rodriguez',
        room: 'Room 204',
        color: 'from-blue-500 to-cyan-500',
        description: 'Advanced mathematics'
      },
      { 
        period: 2, 
        time: '9:00 - 9:50', 
        subject: 'English Literature', 
        teacher: 'Mr. Thompson',
        room: 'Room 118',
        color: 'from-purple-500 to-pink-500',
        description: 'American classics'
      },
      { 
        period: 3, 
        time: '10:00 - 10:50', 
        subject: 'Chemistry Honors', 
        teacher: 'Dr. Chen',
        room: 'Lab 301',
        color: 'from-green-500 to-emerald-500',
        description: 'Organic chemistry unit'
      },
      { 
        period: 4, 
        time: '11:00 - 11:50', 
        subject: 'World History', 
        teacher: 'Mrs. Williams',
        room: 'Room 215',
        color: 'from-amber-500 to-orange-500',
        description: 'Renaissance period'
      },
      { 
        period: 'Lunch', 
        time: '12:00 - 12:40', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Cafeteria',
        color: 'from-gray-400 to-gray-500',
        description: 'Meal time'
      },
      { 
        period: 5, 
        time: '12:50 - 1:40', 
        subject: 'Spanish III', 
        teacher: 'Señora Martinez',
        room: 'Room 106',
        color: 'from-red-500 to-rose-500',
        description: 'Conversational practice'
      },
      { 
        period: 6, 
        time: '1:50 - 2:40', 
        subject: 'Physical Education', 
        teacher: 'Coach Anderson',
        room: 'Gymnasium',
        color: 'from-teal-500 to-cyan-500',
        description: 'Basketball unit'
      },
      { 
        period: 7, 
        time: '2:50 - 3:40', 
        subject: 'Computer Science', 
        teacher: 'Mr. Patel',
        room: 'Lab 405',
        color: 'from-indigo-500 to-violet-500',
        description: 'Python programming'
      }
    ],
    Tuesday: [
      { 
        period: 1, 
        time: '8:00 - 8:50', 
        subject: 'AP Calculus BC', 
        teacher: 'Ms. Rodriguez',
        room: 'Room 204',
        color: 'from-blue-500 to-cyan-500',
        description: 'Derivatives practice'
      },
      { 
        period: 2, 
        time: '9:00 - 9:50', 
        subject: 'English Literature', 
        teacher: 'Mr. Thompson',
        room: 'Room 118',
        color: 'from-purple-500 to-pink-500',
        description: 'Essay workshop'
      },
      { 
        period: 3, 
        time: '10:00 - 10:50', 
        subject: 'Chemistry Honors', 
        teacher: 'Dr. Chen',
        room: 'Lab 301',
        color: 'from-green-500 to-emerald-500',
        description: 'Lab experiment'
      },
      { 
        period: 4, 
        time: '11:00 - 11:50', 
        subject: 'World History', 
        teacher: 'Mrs. Williams',
        room: 'Room 215',
        color: 'from-amber-500 to-orange-500',
        description: 'Document analysis'
      },
      { 
        period: 'Lunch', 
        time: '12:00 - 12:40', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Cafeteria',
        color: 'from-gray-400 to-gray-500',
        description: 'Meal time'
      },
      { 
        period: 5, 
        time: '12:50 - 1:40', 
        subject: 'Spanish III', 
        teacher: 'Señora Martinez',
        room: 'Room 106',
        color: 'from-red-500 to-rose-500',
        description: 'Grammar review'
      },
      { 
        period: 6, 
        time: '1:50 - 2:40', 
        subject: 'Art Studio', 
        teacher: 'Ms. Harper',
        room: 'Art Room 102',
        color: 'from-pink-500 to-fuchsia-500',
        description: 'Oil painting techniques'
      },
      { 
        period: 7, 
        time: '2:50 - 3:40', 
        subject: 'Computer Science', 
        teacher: 'Mr. Patel',
        room: 'Lab 405',
        color: 'from-indigo-500 to-violet-500',
        description: 'Algorithm design'
      }
    ],
    Wednesday: [
      { 
        period: 1, 
        time: '8:00 - 8:50', 
        subject: 'AP Calculus BC', 
        teacher: 'Ms. Rodriguez',
        room: 'Room 204',
        color: 'from-blue-500 to-cyan-500',
        description: 'Integration methods'
      },
      { 
        period: 2, 
        time: '9:00 - 9:50', 
        subject: 'English Literature', 
        teacher: 'Mr. Thompson',
        room: 'Room 118',
        color: 'from-purple-500 to-pink-500',
        description: 'Poetry analysis'
      },
      { 
        period: 3, 
        time: '10:00 - 10:50', 
        subject: 'Chemistry Honors', 
        teacher: 'Dr. Chen',
        room: 'Lab 301',
        color: 'from-green-500 to-emerald-500',
        description: 'Molecular bonding'
      },
      { 
        period: 4, 
        time: '11:00 - 11:50', 
        subject: 'World History', 
        teacher: 'Mrs. Williams',
        room: 'Room 215',
        color: 'from-amber-500 to-orange-500',
        description: 'Group presentations'
      },
      { 
        period: 'Lunch', 
        time: '12:00 - 12:40', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Cafeteria',
        color: 'from-gray-400 to-gray-500',
        description: 'Meal time'
      },
      { 
        period: 5, 
        time: '12:50 - 1:40', 
        subject: 'Spanish III', 
        teacher: 'Señora Martinez',
        room: 'Room 106',
        color: 'from-red-500 to-rose-500',
        description: 'Cultural studies'
      },
      { 
        period: 6, 
        time: '1:50 - 2:40', 
        subject: 'Physical Education', 
        teacher: 'Coach Anderson',
        room: 'Gymnasium',
        color: 'from-teal-500 to-cyan-500',
        description: 'Fitness testing'
      },
      { 
        period: 7, 
        time: '2:50 - 3:40', 
        subject: 'Computer Science', 
        teacher: 'Mr. Patel',
        room: 'Lab 405',
        color: 'from-indigo-500 to-violet-500',
        description: 'Data structures'
      }
    ],
    Thursday: [
      { 
        period: 1, 
        time: '8:00 - 8:50', 
        subject: 'AP Calculus BC', 
        teacher: 'Ms. Rodriguez',
        room: 'Room 204',
        color: 'from-blue-500 to-cyan-500',
        description: 'Problem solving'
      },
      { 
        period: 2, 
        time: '9:00 - 9:50', 
        subject: 'English Literature', 
        teacher: 'Mr. Thompson',
        room: 'Room 118',
        color: 'from-purple-500 to-pink-500',
        description: 'Reading discussion'
      },
      { 
        period: 3, 
        time: '10:00 - 10:50', 
        subject: 'Chemistry Honors', 
        teacher: 'Dr. Chen',
        room: 'Lab 301',
        color: 'from-green-500 to-emerald-500',
        description: 'Quiz review'
      },
      { 
        period: 4, 
        time: '11:00 - 11:50', 
        subject: 'World History', 
        teacher: 'Mrs. Williams',
        room: 'Room 215',
        color: 'from-amber-500 to-orange-500',
        description: 'Film analysis'
      },
      { 
        period: 'Lunch', 
        time: '12:00 - 12:40', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Cafeteria',
        color: 'from-gray-400 to-gray-500',
        description: 'Meal time'
      },
      { 
        period: 5, 
        time: '12:50 - 1:40', 
        subject: 'Spanish III', 
        teacher: 'Señora Martinez',
        room: 'Room 106',
        color: 'from-red-500 to-rose-500',
        description: 'Oral presentations'
      },
      { 
        period: 6, 
        time: '1:50 - 2:40', 
        subject: 'Art Studio', 
        teacher: 'Ms. Harper',
        room: 'Art Room 102',
        color: 'from-pink-500 to-fuchsia-500',
        description: 'Portfolio work'
      },
      { 
        period: 7, 
        time: '2:50 - 3:40', 
        subject: 'Computer Science', 
        teacher: 'Mr. Patel',
        room: 'Lab 405',
        color: 'from-indigo-500 to-violet-500',
        description: 'Project work'
      }
    ],
    Friday: [
      { 
        period: 1, 
        time: '8:00 - 8:50', 
        subject: 'AP Calculus BC', 
        teacher: 'Ms. Rodriguez',
        room: 'Room 204',
        color: 'from-blue-500 to-cyan-500',
        description: 'Weekly quiz'
      },
      { 
        period: 2, 
        time: '9:00 - 9:50', 
        subject: 'English Literature', 
        teacher: 'Mr. Thompson',
        room: 'Room 118',
        color: 'from-purple-500 to-pink-500',
        description: 'Creative writing'
      },
      { 
        period: 3, 
        time: '10:00 - 10:50', 
        subject: 'Chemistry Honors', 
        teacher: 'Dr. Chen',
        room: 'Lab 301',
        color: 'from-green-500 to-emerald-500',
        description: 'Lab report due'
      },
      { 
        period: 4, 
        time: '11:00 - 11:50', 
        subject: 'World History', 
        teacher: 'Mrs. Williams',
        room: 'Room 215',
        color: 'from-amber-500 to-orange-500',
        description: 'Chapter test'
      },
      { 
        period: 'Lunch', 
        time: '12:00 - 12:40', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Cafeteria',
        color: 'from-gray-400 to-gray-500',
        description: 'Meal time'
      },
      { 
        period: 5, 
        time: '12:50 - 1:40', 
        subject: 'Spanish III', 
        teacher: 'Señora Martinez',
        room: 'Room 106',
        color: 'from-red-500 to-rose-500',
        description: 'Vocabulary test'
      },
      { 
        period: 6, 
        time: '1:50 - 2:40', 
        subject: 'Physical Education', 
        teacher: 'Coach Anderson',
        room: 'Gymnasium',
        color: 'from-teal-500 to-cyan-500',
        description: 'Free activity'
      },
      { 
        period: 7, 
        time: '2:50 - 3:40', 
        subject: 'Study Hall', 
        teacher: 'Mr. Davis',
        room: 'Library',
        color: 'from-slate-500 to-gray-600',
        description: 'Independent study'
      }
    ]
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDate = new Date();
  const semesterStart = new Date('2024-09-03');
  const weeksDiff = Math.floor((currentDate - semesterStart) / (7 * 24 * 60 * 60 * 1000));

  const getWeekDates = (weekOffset) => {
    const start = new Date(semesterStart);
    start.setDate(start.getDate() + (weeksDiff + weekOffset) * 7);
    return weekDays.map((_, index) => {
      const date = new Date(start);
      date.setDate(date.getDate() + index);
      return date;
    });
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                My Schedule
              </h1>
              <p className="text-slate-600 text-lg">
                Academic Year 2024-2025 • Fall Semester
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg">
              <Calendar className="text-indigo-600 w-6 h-6" />
              <div>
                <p className="text-sm text-slate-600 font-medium">Current Week</p>
                <p className="text-lg font-bold text-slate-800">Week {weeksDiff + currentWeek + 1}</p>
              </div>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-slate-700">Previous</span>
              </button>
              
              <div className="flex gap-3">
                {weekDays.map((day, index) => {
                  const date = weekDates[index];
                  const isToday = date.toDateString() === currentDate.toDateString();
                  
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        selectedDay === day
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                          : isToday
                          ? 'bg-white border-2 border-indigo-300 text-indigo-700 shadow-sm'
                          : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div className="text-sm font-semibold">{day.slice(0, 3)}</div>
                      <div className="text-xs mt-1 opacity-90">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      {isToday && (
                        <div className="text-xs mt-1 font-bold">Today</div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <span className="font-medium text-slate-700">Next</span>
                <ChevronRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid gap-4">
          {schedule[selectedDay].map((classItem, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Time and Period Badge */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${classItem.color} flex items-center justify-center shadow-lg mb-2`}>
                    <span className="text-2xl font-bold text-white">
                      {classItem.period === 'Lunch' ? '🍽️' : classItem.period}
                    </span>
                  </div>
                  <div className="text-center">
                    <Clock className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-slate-700 font-mono">{classItem.time}</p>
                  </div>
                </div>

                {/* Class Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-1">{classItem.subject}</h3>
                      <p className="text-slate-600 text-sm">{classItem.description}</p>
                    </div>
                    {classItem.period !== 'Lunch' && (
                      <div className="bg-gradient-to-br from-amber-100 to-yellow-100 px-4 py-2 rounded-xl border border-amber-200">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-semibold text-amber-700">50 min</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    {classItem.teacher && (
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <span className="text-slate-700 font-medium">{classItem.teacher}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span className="text-slate-700 font-medium">{classItem.room}</span>
                    </div>
                    {classItem.period !== 'Lunch' && (
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-700 font-medium">Academic</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {schedule[selectedDay].filter(c => c.period !== 'Lunch').length}
            </div>
            <div className="text-sm text-slate-600 font-medium">Classes Today</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              7h 40m
            </div>
            <div className="text-sm text-slate-600 font-medium">School Hours</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              40min
            </div>
            <div className="text-sm text-slate-600 font-medium">Lunch Break</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              15
            </div>
            <div className="text-sm text-slate-600 font-medium">Weeks Left</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;