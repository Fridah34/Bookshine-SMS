import React, { useState } from 'react';
import { Clock, BookOpen, Users, MapPin, Bell, Calendar, ChevronLeft, ChevronRight, Coffee, Home, User } from 'lucide-react';

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Student's form and stream (this would come from auth/context)
  const studentForm = 'Form 3';
  const studentStream = 'B';
  const classTeacher = 'Mrs. Wanjiku'; // Class teacher in charge of Form 3B

  // Kenyan high school schedule with common periods and stream-specific subjects
  const schedule = {
    Monday: [
      { 
        period: 'Assembly', 
        time: '7:30 - 8:00', 
        subject: 'Morning Assembly', 
        teacher: null,
        room: 'School Grounds',
        color: 'from-gray-400 to-gray-500',
        description: 'All students - Morning devotion',
        isCommon: true
      },
      { 
        period: 1, 
        time: '8:00 - 8:40', 
        subject: 'Mathematics', 
        teacher: 'Mr. Kamau',
        room: 'Room 3B',
        color: 'from-blue-500 to-cyan-500',
        description: 'Algebra - Quadratic equations'
      },
      { 
        period: 2, 
        time: '8:40 - 9:20', 
        subject: 'English', 
        teacher: 'Mrs. Wanjiku',
        room: 'Room 3B',
        color: 'from-purple-500 to-pink-500',
        description: 'Literature - Poetry analysis'
      },
      { 
        period: 3, 
        time: '9:20 - 10:00', 
        subject: 'Kiswahili', 
        teacher: 'Mwalimu Omondi',
        room: 'Room 3B',
        color: 'from-green-500 to-emerald-500',
        description: 'Fasihi - Riwaya'
      },
      { 
        period: 'Break', 
        time: '10:00 - 10:20', 
        subject: 'Tea Break', 
        teacher: null,
        room: 'Canteen',
        color: 'from-amber-400 to-orange-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 4, 
        time: '10:20 - 11:00', 
        subject: 'Chemistry', 
        teacher: 'Dr. Mutua',
        room: 'Lab 2',
        color: 'from-teal-500 to-cyan-500',
        description: 'Organic chemistry'
      },
      { 
        period: 5, 
        time: '11:00 - 11:40', 
        subject: 'Physics', 
        teacher: 'Mr. Kipchoge',
        room: 'Lab 3',
        color: 'from-indigo-500 to-violet-500',
        description: 'Mechanics - Newton\'s laws'
      },
      { 
        period: 6, 
        time: '11:40 - 12:20', 
        subject: 'Biology', 
        teacher: 'Mrs. Akinyi',
        room: 'Lab 1',
        color: 'from-green-600 to-emerald-600',
        description: 'Genetics and inheritance'
      },
      { 
        period: 7, 
        time: '12:20 - 1:00', 
        subject: 'History', 
        teacher: 'Mr. Njoroge',
        room: 'Room 3B',
        color: 'from-amber-500 to-orange-500',
        description: 'World War I'
      },
      { 
        period: 'Lunch', 
        time: '1:00 - 2:00', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Dining Hall',
        color: 'from-rose-400 to-pink-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 8, 
        time: '2:00 - 2:40', 
        subject: 'CRE', 
        teacher: 'Mrs. Chepkemoi',
        room: 'Room 3B',
        color: 'from-purple-600 to-pink-600',
        description: 'Biblical teachings'
      },
      { 
        period: 9, 
        time: '2:40 - 3:20', 
        subject: 'Computer Studies', 
        teacher: 'Mr. Mwangi',
        room: 'Computer Lab',
        color: 'from-blue-600 to-indigo-600',
        description: 'Spreadsheets'
      },
      { 
        period: 10, 
        time: '3:20 - 4:00', 
        subject: 'Geography', 
        teacher: 'Mrs. Wambui',
        room: 'Room 3B',
        color: 'from-emerald-600 to-green-600',
        description: 'Physical geography'
      },
      { 
        period: 'Games', 
        time: '4:00 - 5:00', 
        subject: 'Games & Sports', 
        teacher: 'Coach Otieno',
        room: 'Sports Field',
        color: 'from-green-500 to-teal-500',
        description: 'All students - Athletics',
        isCommon: true
      },
      { 
        period: 'Evening', 
        time: '7:00 - 9:00', 
        subject: 'Evening Prep', 
        teacher: 'Duty Teacher',
        room: 'Classroom',
        color: 'from-slate-600 to-gray-600',
        description: 'All students - Study time',
        isCommon: true
      }
    ],
    Tuesday: [
      { 
        period: 1, 
        time: '7:30 - 8:10', 
        subject: 'Physics', 
        teacher: 'Mr. Kipchoge',
        room: 'Lab 3',
        color: 'from-indigo-500 to-violet-500',
        description: 'Work and energy'
      },
      { 
        period: 2, 
        time: '8:10 - 8:50', 
        subject: 'Mathematics', 
        teacher: 'Mr. Kamau',
        room: 'Room 3B',
        color: 'from-blue-500 to-cyan-500',
        description: 'Trigonometry'
      },
      { 
        period: 3, 
        time: '8:50 - 9:30', 
        subject: 'Biology', 
        teacher: 'Mrs. Akinyi',
        room: 'Lab 1',
        color: 'from-green-600 to-emerald-600',
        description: 'Cell structure'
      },
      { 
        period: 4, 
        time: '9:30 - 10:10', 
        subject: 'English', 
        teacher: 'Mrs. Wanjiku',
        room: 'Room 3B',
        color: 'from-purple-500 to-pink-500',
        description: 'Grammar - Tenses'
      },
      { 
        period: 'Break', 
        time: '10:10 - 10:30', 
        subject: 'Tea Break', 
        teacher: null,
        room: 'Canteen',
        color: 'from-amber-400 to-orange-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 5, 
        time: '10:30 - 11:10', 
        subject: 'Chemistry', 
        teacher: 'Dr. Mutua',
        room: 'Lab 2',
        color: 'from-teal-500 to-cyan-500',
        description: 'Chemical reactions'
      },
      { 
        period: 6, 
        time: '11:10 - 11:50', 
        subject: 'Kiswahili', 
        teacher: 'Mwalimu Omondi',
        room: 'Room 3B',
        color: 'from-green-500 to-emerald-500',
        description: 'Sarufi - Nomino'
      },
      { 
        period: 7, 
        time: '11:50 - 12:30', 
        subject: 'Geography', 
        teacher: 'Mrs. Wambui',
        room: 'Room 3B',
        color: 'from-emerald-600 to-green-600',
        description: 'Map reading'
      },
      { 
        period: 8, 
        time: '12:30 - 1:10', 
        subject: 'History', 
        teacher: 'Mr. Njoroge',
        room: 'Room 3B',
        color: 'from-amber-500 to-orange-500',
        description: 'African nationalism'
      },
      { 
        period: 'Lunch', 
        time: '1:10 - 2:10', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Dining Hall',
        color: 'from-rose-400 to-pink-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 9, 
        time: '2:10 - 2:50', 
        subject: 'Computer Studies', 
        teacher: 'Mr. Mwangi',
        room: 'Computer Lab',
        color: 'from-blue-600 to-indigo-600',
        description: 'Database basics'
      },
      { 
        period: 10, 
        time: '2:50 - 3:30', 
        subject: 'CRE', 
        teacher: 'Mrs. Chepkemoi',
        room: 'Room 3B',
        color: 'from-purple-600 to-pink-600',
        description: 'Christian living'
      },
      { 
        period: 11, 
        time: '3:30 - 4:10', 
        subject: 'Physical Education', 
        teacher: 'Coach Otieno',
        room: 'Gymnasium',
        color: 'from-cyan-500 to-teal-500',
        description: 'Basketball drills'
      },
      { 
        period: 'Games', 
        time: '4:10 - 5:10', 
        subject: 'Games & Sports', 
        teacher: 'Coach Otieno',
        room: 'Sports Field',
        color: 'from-green-500 to-teal-500',
        description: 'All students - Football/Netball',
        isCommon: true
      },
      { 
        period: 'Evening', 
        time: '7:00 - 9:00', 
        subject: 'Evening Prep', 
        teacher: 'Duty Teacher',
        room: 'Classroom',
        color: 'from-slate-600 to-gray-600',
        description: 'All students - Study time',
        isCommon: true
      }
    ],
    Wednesday: [
      { 
        period: 1, 
        time: '7:30 - 8:10', 
        subject: 'Chemistry', 
        teacher: 'Dr. Mutua',
        room: 'Lab 2',
        color: 'from-teal-500 to-cyan-500',
        description: 'Acids and bases'
      },
      { 
        period: 2, 
        time: '8:10 - 8:50', 
        subject: 'Kiswahili', 
        teacher: 'Mwalimu Omondi',
        room: 'Room 3B',
        color: 'from-green-500 to-emerald-500',
        description: 'Insha - Barua rasmi'
      },
      { 
        period: 3, 
        time: '8:50 - 9:30', 
        subject: 'English', 
        teacher: 'Mrs. Wanjiku',
        room: 'Room 3B',
        color: 'from-purple-500 to-pink-500',
        description: 'Composition writing'
      },
      { 
        period: 4, 
        time: '9:30 - 10:10', 
        subject: 'Mathematics', 
        teacher: 'Mr. Kamau',
        room: 'Room 3B',
        color: 'from-blue-500 to-cyan-500',
        description: 'Geometry - Circles'
      },
      { 
        period: 'Break', 
        time: '10:10 - 10:30', 
        subject: 'Tea Break', 
        teacher: null,
        room: 'Canteen',
        color: 'from-amber-400 to-orange-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 5, 
        time: '10:30 - 11:10', 
        subject: 'History', 
        teacher: 'Mr. Njoroge',
        room: 'Room 3B',
        color: 'from-amber-500 to-orange-500',
        description: 'The Mau Mau uprising'
      },
      { 
        period: 6, 
        time: '11:10 - 11:50', 
        subject: 'Physics', 
        teacher: 'Mr. Kipchoge',
        room: 'Lab 3',
        color: 'from-indigo-500 to-violet-500',
        description: 'Electricity'
      },
      { 
        period: 7, 
        time: '11:50 - 12:30', 
        subject: 'Biology', 
        teacher: 'Mrs. Akinyi',
        room: 'Lab 1',
        color: 'from-green-600 to-emerald-600',
        description: 'Photosynthesis'
      },
      { 
        period: 8, 
        time: '12:30 - 1:10', 
        subject: 'Geography', 
        teacher: 'Mrs. Wambui',
        room: 'Room 3B',
        color: 'from-emerald-600 to-green-600',
        description: 'Climate and vegetation'
      },
      { 
        period: 'Lunch', 
        time: '1:10 - 2:10', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Dining Hall',
        color: 'from-rose-400 to-pink-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 9, 
        time: '2:10 - 2:50', 
        subject: 'CRE', 
        teacher: 'Mrs. Chepkemoi',
        room: 'Room 3B',
        color: 'from-purple-600 to-pink-600',
        description: 'Old Testament prophets'
      },
      { 
        period: 10, 
        time: '2:50 - 3:30', 
        subject: 'Computer Studies', 
        teacher: 'Mr. Mwangi',
        room: 'Computer Lab',
        color: 'from-blue-600 to-indigo-600',
        description: 'Programming basics'
      },
      { 
        period: 11, 
        time: '3:30 - 4:10', 
        subject: 'Art & Design', 
        teacher: 'Mrs. Adhiambo',
        room: 'Art Room',
        color: 'from-pink-500 to-rose-500',
        description: 'Still life drawing'
      },
      { 
        period: 'Clubs', 
        time: '4:10 - 5:10', 
        subject: 'Clubs & Societies', 
        teacher: 'Various Patrons',
        room: 'Various Rooms',
        color: 'from-indigo-500 to-purple-500',
        description: 'All students - Drama, Music, Science clubs',
        isCommon: true
      },
      { 
        period: 'Evening', 
        time: '7:00 - 9:00', 
        subject: 'Evening Prep', 
        teacher: 'Duty Teacher',
        room: 'Classroom',
        color: 'from-slate-600 to-gray-600',
        description: 'All students - Study time',
        isCommon: true
      }
    ],
    Thursday: [
      { 
        period: 1, 
        time: '7:30 - 8:10', 
        subject: 'Biology', 
        teacher: 'Mrs. Akinyi',
        room: 'Lab 1',
        color: 'from-green-600 to-emerald-600',
        description: 'Respiration'
      },
      { 
        period: 2, 
        time: '8:10 - 8:50', 
        subject: 'Physics', 
        teacher: 'Mr. Kipchoge',
        room: 'Lab 3',
        color: 'from-indigo-500 to-violet-500',
        description: 'Magnetism'
      },
      { 
        period: 3, 
        time: '8:50 - 9:30', 
        subject: 'Mathematics', 
        teacher: 'Mr. Kamau',
        room: 'Room 3B',
        color: 'from-blue-500 to-cyan-500',
        description: 'Statistics'
      },
      { 
        period: 4, 
        time: '9:30 - 10:10', 
        subject: 'History', 
        teacher: 'Mr. Njoroge',
        room: 'Room 3B',
        color: 'from-amber-500 to-orange-500',
        description: 'European invasion'
      },
      { 
        period: 'Break', 
        time: '10:10 - 10:30', 
        subject: 'Tea Break', 
        teacher: null,
        room: 'Canteen',
        color: 'from-amber-400 to-orange-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 5, 
        time: '10:30 - 11:10', 
        subject: 'English', 
        teacher: 'Mrs. Wanjiku',
        room: 'Room 3B',
        color: 'from-purple-500 to-pink-500',
        description: 'Oral literature'
      },
      { 
        period: 6, 
        time: '11:10 - 11:50', 
        subject: 'Computer Studies', 
        teacher: 'Mr. Mwangi',
        room: 'Computer Lab',
        color: 'from-blue-600 to-indigo-600',
        description: 'Word processing'
      },
      { 
        period: 7, 
        time: '11:50 - 12:30', 
        subject: 'Chemistry', 
        teacher: 'Dr. Mutua',
        room: 'Lab 2',
        color: 'from-teal-500 to-cyan-500',
        description: 'Practical session'
      },
      { 
        period: 8, 
        time: '12:30 - 1:10', 
        subject: 'Kiswahili', 
        teacher: 'Mwalimu Omondi',
        room: 'Room 3B',
        color: 'from-green-500 to-emerald-500',
        description: 'Utungaji'
      },
      { 
        period: 'Lunch', 
        time: '1:10 - 2:10', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Dining Hall',
        color: 'from-rose-400 to-pink-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 9, 
        time: '2:10 - 2:50', 
        subject: 'Geography', 
        teacher: 'Mrs. Wambui',
        room: 'Room 3B',
        color: 'from-emerald-600 to-green-600',
        description: 'Economic activities'
      },
      { 
        period: 10, 
        time: '2:50 - 3:30', 
        subject: 'CRE', 
        teacher: 'Mrs. Chepkemoi',
        room: 'Room 3B',
        color: 'from-purple-600 to-pink-600',
        description: 'Christian ethics'
      },
      { 
        period: 11, 
        time: '3:30 - 4:10', 
        subject: 'Music', 
        teacher: 'Mr. Otieno',
        room: 'Music Room',
        color: 'from-violet-500 to-purple-500',
        description: 'African traditional music'
      },
      { 
        period: 'Games', 
        time: '4:10 - 5:10', 
        subject: 'Games & Sports', 
        teacher: 'Coach Otieno',
        room: 'Sports Field',
        color: 'from-green-500 to-teal-500',
        description: 'All students - Volleyball/Basketball',
        isCommon: true
      },
      { 
        period: 'Evening', 
        time: '7:00 - 9:00', 
        subject: 'Evening Prep', 
        teacher: 'Duty Teacher',
        room: 'Classroom',
        color: 'from-slate-600 to-gray-600',
        description: 'All students - Study time',
        isCommon: true
      }
    ],
    Friday: [
      { 
        period: 'Assembly', 
        time: '7:30 - 8:00', 
        subject: 'Morning Assembly', 
        teacher: null,
        room: 'School Grounds',
        color: 'from-gray-400 to-gray-500',
        description: 'All students - Weekly announcements',
        isCommon: true
      },
      { 
        period: 1, 
        time: '8:00 - 8:40', 
        subject: 'English', 
        teacher: 'Mrs. Wanjiku',
        room: 'Room 3B',
        color: 'from-purple-500 to-pink-500',
        description: 'Summary writing'
      },
      { 
        period: 2, 
        time: '8:40 - 9:20', 
        subject: 'Mathematics', 
        teacher: 'Mr. Kamau',
        room: 'Room 3B',
        color: 'from-blue-500 to-cyan-500',
        description: 'Revision'
      },
      { 
        period: 3, 
        time: '9:20 - 10:00', 
        subject: 'Chemistry', 
        teacher: 'Dr. Mutua',
        room: 'Lab 2',
        color: 'from-teal-500 to-cyan-500',
        description: 'Revision'
      },
      { 
        period: 'Break', 
        time: '10:00 - 10:20', 
        subject: 'Tea Break', 
        teacher: null,
        room: 'Canteen',
        color: 'from-amber-400 to-orange-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 4, 
        time: '10:20 - 11:00', 
        subject: 'Physics', 
        teacher: 'Mr. Kipchoge',
        room: 'Lab 3',
        color: 'from-indigo-500 to-violet-500',
        description: 'Revision'
      },
      { 
        period: 5, 
        time: '11:00 - 11:40', 
        subject: 'Kiswahili', 
        teacher: 'Mwalimu Omondi',
        room: 'Room 3B',
        color: 'from-green-500 to-emerald-500',
        description: 'Revision'
      },
      { 
        period: 6, 
        time: '11:40 - 12:20', 
        subject: 'Biology', 
        teacher: 'Mrs. Akinyi',
        room: 'Lab 1',
        color: 'from-green-600 to-emerald-600',
        description: 'Revision'
      },
      { 
        period: 7, 
        time: '12:20 - 1:00', 
        subject: 'Life Skills', 
        teacher: classTeacher,
        room: 'Room 3B',
        color: 'from-cyan-400 to-blue-400',
        description: 'Guidance and Counseling'
      },
      { 
        period: 'Lunch', 
        time: '1:00 - 2:00', 
        subject: 'Lunch Break', 
        teacher: null,
        room: 'Dining Hall',
        color: 'from-rose-400 to-pink-400',
        description: 'All students',
        isCommon: true
      },
      { 
        period: 'Cleaning', 
        time: '2:00 - 3:00', 
        subject: 'General Cleaning', 
        teacher: classTeacher,
        room: 'School Compound',
        color: 'from-cyan-500 to-blue-500',
        description: 'All students - Class and dormitory cleaning',
        isCommon: true
      },
      { 
        period: 'Home', 
        time: '3:00', 
        subject: 'Home Time', 
        teacher: null,
        room: null,
        color: 'from-green-600 to-emerald-600',
        description: 'Day scholars dismissed - Boarders stay',
        isCommon: true
      }
    ]
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDate = new Date();
  const termStart = new Date('2026-01-05'); // Term 1, 2026
  const weeksDiff = Math.floor((currentDate - termStart) / (7 * 24 * 60 * 60 * 1000));

  const getWeekDates = (weekOffset) => {
    const start = new Date(termStart);
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
                {studentForm} {studentStream} • Term 1, 2026
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

          {/* Class Teacher Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Class Teacher</p>
                <p className="text-lg font-bold text-slate-800">{classTeacher}</p>
                <p className="text-xs text-slate-500">In charge of {studentForm} {studentStream}</p>
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
                        <div className="text-xs mt-1 font-bold">Leo</div>
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
              className={`bg-white/70 backdrop-blur-lg border ${
                classItem.isCommon ? 'border-orange-200 bg-gradient-to-r from-orange-50/50 to-amber-50/50' : 'border-white/80'
              } rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-start gap-6">
                {/* Time and Period Badge */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${classItem.color} flex items-center justify-center shadow-lg mb-2`}>
                    <span className="text-2xl font-bold text-white">
                      {classItem.period === 'Assembly' ? '🔔' : 
                       classItem.period === 'Break' ? '☕' :
                       classItem.period === 'Lunch' ? '🍽️' :
                       classItem.period === 'Games' ? '⚽' :
                       classItem.period === 'Clubs' ? '🎭' :
                       classItem.period === 'Cleaning' ? '🧹' :
                       classItem.period === 'Evening' ? '📚' :
                       classItem.period === 'Home' ? '🏠' :
                       classItem.period}
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-slate-800">{classItem.subject}</h3>
                        {classItem.isCommon && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                            All Students
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm">{classItem.description}</p>
                    </div>
                    {!classItem.isCommon && classItem.period !== 'Home' && (
                      <div className="bg-gradient-to-br from-amber-100 to-yellow-100 px-4 py-2 rounded-xl border border-amber-200">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-semibold text-amber-700">40 min</span>
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
                    {classItem.room && (
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                        <MapPin className="w-4 h-4 text-rose-500" />
                        <span className="text-slate-700 font-medium">{classItem.room}</span>
                      </div>
                    )}
                    {!classItem.isCommon && classItem.period !== 'Home' && (
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-700 font-medium">{studentForm} {studentStream}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {schedule[selectedDay].filter(c => !c.isCommon && c.period !== 'Home').length}
            </div>
            <div className="text-sm text-slate-600 font-medium">Lessons Today</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {studentForm} {studentStream}
            </div>
            <div className="text-sm text-slate-600 font-medium">Your Class</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {classTeacher}
            </div>
            <div className="text-sm text-slate-600 font-medium">Class Teacher</div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              {12 - (weeksDiff + currentWeek)}
            </div>
            <div className="text-sm text-slate-600 font-medium">Weeks to Exams</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;