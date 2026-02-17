import React, { useState } from 'react';
import { BookOpen, Users, Clock, ArrowLeft, FileText, Calendar, TrendingUp, Award, ChevronRight, Download, AlertCircle, ClipboardList } from 'lucide-react';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Realistic Kenyan high school subjects
  const courses = [
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH-301',
      teacher: 'Mr. Kimani',
      room: 'Room 204',
      schedule: 'Mon, Tue, Wed, Thu, Fri',
      time: '8:00 - 8:50 AM',
      color: 'from-blue-500 to-cyan-500',
      description: 'Form 3 Mathematics covering Algebra, Geometry, and Trigonometry',
      topics: ['Quadratic Equations', 'Trigonometry', 'Vectors', 'Statistics', 'Logarithms', 'Matrices'],
      currentTopic: 'Trigonometry - Sine and Cosine Rules',
      syllabus: [
        { unit: 'Algebra', status: 'completed', progress: 100 },
        { unit: 'Geometry', status: 'completed', progress: 100 },
        { unit: 'Trigonometry', status: 'in-progress', progress: 65 },
        { unit: 'Statistics', status: 'pending', progress: 0 },
        { unit: 'Calculus', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Trigonometry Class Notes', date: '2024-11-10', type: 'Teacher Handout' },
        { title: 'Past KCSE Paper 2023', date: '2024-11-08', type: 'Past Paper' },
        { title: 'Algebra Practice Questions', date: '2024-10-28', type: 'Practice Sheet' }
      ],
      textbookReferences: [
        { chapter: 'Chapter 8: Trigonometry', pages: '156-178' },
        { chapter: 'Chapter 9: Vectors', pages: '180-205' }
      ],
      assignments: [
        { title: 'Trigonometry Assignment', instruction: 'KLB Mathematics Form 3: Exercise 8.2, Questions 1-15', dueDate: '2024-12-20', status: 'pending' },
        { title: 'Weekly Problem Set', instruction: 'Practice questions on sine and cosine rules', dueDate: '2024-12-18', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 78, outOf: 100 },
        { title: 'Monthly Test', date: '2024-10-15', marks: 82, outOf: 100 }
      ]
    },
    {
      id: 2,
      name: 'English',
      code: 'ENG-301',
      teacher: 'Mrs. Wanjiru',
      room: 'Room 118',
      schedule: 'Mon, Tue, Wed, Thu, Fri',
      time: '9:00 - 9:50 AM',
      color: 'from-purple-500 to-pink-500',
      description: 'English Language and Literature including composition, grammar, and set books',
      topics: ['Grammar', 'Composition', 'Oral Literature', 'Set Books', 'Comprehension', 'Poetry'],
      currentTopic: 'The River and the Source - Analysis',
      syllabus: [
        { unit: 'Grammar & Syntax', status: 'completed', progress: 100 },
        { unit: 'Composition Writing', status: 'in-progress', progress: 70 },
        { unit: 'The River and the Source', status: 'in-progress', progress: 60 },
        { unit: 'Poetry', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Essay Writing Guide', date: '2024-11-12', type: 'Teacher Handout' },
        { title: 'KCSE 2022 English Paper 1', date: '2024-11-05', type: 'Past Paper' },
        { title: 'Set Book Discussion Questions', date: '2024-11-08', type: 'Study Guide' }
      ],
      textbookReferences: [
        { chapter: 'The River and the Source - Chapters 5-8', pages: '89-145' },
        { chapter: 'Grammar Guide: Chapter 4', pages: '45-67' }
      ],
      assignments: [
        { title: 'Descriptive Essay', instruction: 'Write a 450-word descriptive essay on "A Market Day"', dueDate: '2024-12-22', status: 'pending' },
        { title: 'Set Book Questions', instruction: 'Answer questions 1-5 from Chapter 7 study guide', dueDate: '2024-12-19', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 72, outOf: 100 },
        { title: 'Monthly Test', date: '2024-10-15', marks: 75, outOf: 100 }
      ]
    },
    {
      id: 3,
      name: 'Kiswahili',
      code: 'KIS-301',
      teacher: 'Mwalimu Omondi',
      room: 'Room 215',
      schedule: 'Mon, Tue, Wed, Thu',
      time: '10:00 - 10:50 AM',
      color: 'from-green-500 to-emerald-500',
      description: 'Kiswahili Language covering Sarufi, Insha, na Fasihi',
      topics: ['Sarufi', 'Insha', 'Fasihi Simulizi', 'Fasihi Andishi', 'Lugha', 'Ushairi'],
      currentTopic: 'Insha - Barua Rasmi',
      syllabus: [
        { unit: 'Sarufi', status: 'completed', progress: 100 },
        { unit: 'Insha', status: 'in-progress', progress: 75 },
        { unit: 'Fasihi Simulizi', status: 'in-progress', progress: 55 },
        { unit: 'Ushairi', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Muundo wa Barua Rasmi', date: '2024-11-10', type: 'Teacher Handout' },
        { title: 'KCSE 2021 Kiswahili Paper 2', date: '2024-10-28', type: 'Past Paper' },
        { title: 'Sarufi ya Kiswahili', date: '2024-10-25', type: 'Study Notes' }
      ],
      textbookReferences: [
        { chapter: 'Sura ya 6: Insha', pages: '78-95' },
        { chapter: 'Sura ya 7: Fasihi Simulizi', pages: '96-120' }
      ],
      assignments: [
        { title: 'Insha - Barua Rasmi', instruction: 'Andika barua rasmi kwa mkurugenzi wa shule', dueDate: '2024-12-21', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 68, outOf: 100 }
      ]
    },
    {
      id: 4,
      name: 'Chemistry',
      code: 'CHEM-301',
      teacher: 'Dr. Mwangi',
      room: 'Lab 301',
      schedule: 'Mon, Wed, Fri',
      time: '11:00 - 11:50 AM',
      color: 'from-orange-500 to-amber-500',
      description: 'Form 3 Chemistry including Organic Chemistry and Chemical Reactions',
      topics: ['Organic Chemistry', 'Acids & Bases', 'Chemical Bonding', 'Moles', 'Rates of Reaction', 'Energy Changes'],
      currentTopic: 'Organic Chemistry - Hydrocarbons',
      syllabus: [
        { unit: 'Chemical Bonding', status: 'completed', progress: 100 },
        { unit: 'Organic Chemistry', status: 'in-progress', progress: 60 },
        { unit: 'Rates of Reaction', status: 'pending', progress: 0 },
        { unit: 'Energy Changes', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Organic Chemistry Summary', date: '2024-11-14', type: 'Teacher Handout' },
        { title: 'Lab Safety Guidelines', date: '2024-09-05', type: 'Lab Manual' },
        { title: 'KCSE 2020 Chemistry Paper 1', date: '2024-11-01', type: 'Past Paper' }
      ],
      textbookReferences: [
        { chapter: 'Chapter 12: Organic Chemistry', pages: '234-268' },
        { chapter: 'Chapter 13: Hydrocarbons', pages: '270-295' }
      ],
      assignments: [
        { title: 'Lab Report - Titration', instruction: 'Write practical report on acid-base titration experiment', dueDate: '2024-12-20', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 75, outOf: 100 }
      ]
    },
    {
      id: 5,
      name: 'Physics',
      code: 'PHY-301',
      teacher: 'Mr. Njoroge',
      room: 'Lab 205',
      schedule: 'Tue, Thu, Fri',
      time: '12:00 - 12:50 PM',
      color: 'from-indigo-500 to-purple-500',
      description: 'Form 3 Physics covering Mechanics, Electricity, and Waves',
      topics: ['Mechanics', 'Electricity', 'Magnetism', 'Waves', 'Light', 'Modern Physics'],
      currentTopic: 'Electricity - Ohm\'s Law and Circuits',
      syllabus: [
        { unit: 'Mechanics', status: 'completed', progress: 100 },
        { unit: 'Electricity', status: 'in-progress', progress: 70 },
        { unit: 'Magnetism', status: 'pending', progress: 0 },
        { unit: 'Waves', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Electricity Notes', date: '2024-11-12', type: 'Teacher Handout' },
        { title: 'Circuit Diagram Guide', date: '2024-11-08', type: 'Study Guide' },
        { title: 'KCSE 2022 Physics Paper 2', date: '2024-10-28', type: 'Past Paper' }
      ],
      textbookReferences: [
        { chapter: 'Chapter 10: Electricity', pages: '189-215' },
        { chapter: 'Chapter 11: Circuits', pages: '216-240' }
      ],
      assignments: [
        { title: 'Physics Problems Set 5', instruction: 'Solve problems 1-20 on Ohm\'s Law from textbook page 210', dueDate: '2024-12-19', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 71, outOf: 100 }
      ]
    },
    {
      id: 6,
      name: 'Biology',
      code: 'BIO-301',
      teacher: 'Mrs. Akinyi',
      room: 'Lab 102',
      schedule: 'Mon, Wed, Thu',
      time: '1:00 - 1:50 PM',
      color: 'from-teal-500 to-cyan-500',
      description: 'Form 3 Biology covering Cell Biology, Genetics, and Classification',
      topics: ['Cell Biology', 'Genetics', 'Evolution', 'Classification', 'Ecology', 'Human Biology'],
      currentTopic: 'Genetics - Mendelian Inheritance',
      syllabus: [
        { unit: 'Cell Biology', status: 'completed', progress: 100 },
        { unit: 'Genetics', status: 'in-progress', progress: 65 },
        { unit: 'Evolution', status: 'pending', progress: 0 },
        { unit: 'Ecology', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Genetics Class Notes', date: '2024-11-13', type: 'Teacher Handout' },
        { title: 'Cell Structure Diagrams', date: '2024-10-22', type: 'Study Guide' },
        { title: 'KCSE 2021 Biology Paper 1', date: '2024-11-05', type: 'Past Paper' }
      ],
      textbookReferences: [
        { chapter: 'Chapter 15: Genetics', pages: '290-320' },
        { chapter: 'Chapter 16: Heredity', pages: '322-345' }
      ],
      assignments: [
        { title: 'Genetics Practice', instruction: 'Complete genetics crosses worksheet - Punnett squares 1-10', dueDate: '2024-12-21', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 80, outOf: 100 }
      ]
    },
    {
      id: 7,
      name: 'History & Government',
      code: 'HIST-301',
      teacher: 'Mr. Mutua',
      room: 'Room 310',
      schedule: 'Tue, Wed, Fri',
      time: '2:00 - 2:50 PM',
      color: 'from-red-500 to-rose-500',
      description: 'Kenyan and World History, Government systems and Citizenship',
      topics: ['Pre-Colonial Africa', 'Colonialism', 'Independence', 'Government Systems', 'Kenyan Constitution', 'International Relations'],
      currentTopic: 'The Struggle for Independence in Kenya',
      syllabus: [
        { unit: 'Pre-Colonial Africa', status: 'completed', progress: 100 },
        { unit: 'Colonialism', status: 'in-progress', progress: 80 },
        { unit: 'Independence Movements', status: 'in-progress', progress: 45 },
        { unit: 'Modern Governance', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Kenya Independence Timeline', date: '2024-11-11', type: 'Study Guide' },
        { title: 'Colonial Period Notes', date: '2024-10-28', type: 'Teacher Handout' },
        { title: 'KCSE 2020 History Paper 1', date: '2024-10-15', type: 'Past Paper' }
      ],
      textbookReferences: [
        { chapter: 'Chapter 9: Colonialism in Kenya', pages: '165-190' },
        { chapter: 'Chapter 10: Independence Struggle', pages: '192-215' }
      ],
      assignments: [
        { title: 'Essay - Impact of Colonialism', instruction: 'Write essay on effects of colonial rule in Kenya (600 words)', dueDate: '2024-12-22', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 66, outOf: 100 }
      ]
    },
    {
      id: 8,
      name: 'Geography',
      code: 'GEO-301',
      teacher: 'Mrs. Chepkemoi',
      room: 'Room 208',
      schedule: 'Mon, Thu, Fri',
      time: '3:00 - 3:50 PM',
      color: 'from-emerald-500 to-green-600',
      description: 'Physical and Human Geography including map work and field studies',
      topics: ['Map Work', 'Weather & Climate', 'Vegetation', 'Population', 'Economic Activities', 'Environmental Conservation'],
      currentTopic: 'Climate and Weather Patterns in Kenya',
      syllabus: [
        { unit: 'Map Work', status: 'completed', progress: 100 },
        { unit: 'Weather & Climate', status: 'in-progress', progress: 70 },
        { unit: 'Vegetation', status: 'pending', progress: 0 },
        { unit: 'Population', status: 'pending', progress: 0 }
      ],
      resources: [
        { title: 'Climate Zones of Kenya', date: '2024-11-14', type: 'Teacher Handout' },
        { title: 'Map Reading Guide', date: '2024-10-05', type: 'Study Guide' },
        { title: 'KCSE 2021 Geography Paper 1', date: '2024-10-28', type: 'Past Paper' }
      ],
      textbookReferences: [
        { chapter: 'Chapter 7: Climate', pages: '134-160' },
        { chapter: 'Chapter 8: Weather Patterns', pages: '162-180' }
      ],
      assignments: [
        { title: 'Map Work Exercise', instruction: 'Complete topographic map questions 1-8 from workbook', dueDate: '2024-12-20', status: 'pending' }
      ],
      pastExams: [
        { title: 'Mid-Term Exam', date: '2024-11-05', marks: 73, outOf: 100 }
      ]
    }
  ];

  // Course List View
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              My Subjects
            </h1>
            <p className="text-slate-600 text-lg">
              Form 3 - Term 2, 2024 • {courses.length} Subjects
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Course Header */}
                <div className={`h-32 bg-gradient-to-br ${course.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-xl mb-1">{course.name}</h3>
                    <p className="text-white/90 text-sm">{course.teacher}</p>
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {course.time}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {course.schedule}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.room}
                    </div>
                  </div>

                  <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Course Detail View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setSelectedCourse(null)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-lg border border-white/80 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-indigo-600" />
          <span className="font-medium text-slate-700">Back to Subjects</span>
        </button>

        {/* Course Header */}
        <div className={`bg-gradient-to-br ${selectedCourse.color} rounded-2xl p-8 shadow-xl mb-8`}>
          <div className="flex items-start justify-between text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2">{selectedCourse.name}</h1>
              <p className="text-white/90 text-lg mb-4">{selectedCourse.teacher} • {selectedCourse.room}</p>
              <p className="text-white/80">{selectedCourse.description}</p>
            </div>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold">
              {selectedCourse.code}
            </span>
          </div>
        </div>

        {/* Current Topic Banner */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedCourse.color} flex items-center justify-center`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Currently Studying</p>
              <p className="text-xl font-bold text-slate-800">{selectedCourse.currentTopic}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Syllabus & Topics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Syllabus Coverage */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Syllabus Coverage</h3>
              <div className="space-y-4">
                {selectedCourse.syllabus.map((unit, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          unit.status === 'completed' ? 'bg-green-100' :
                          unit.status === 'in-progress' ? 'bg-blue-100' :
                          'bg-slate-100'
                        }`}>
                          {unit.status === 'completed' ? (
                            <span className="text-green-600 font-bold text-lg">✓</span>
                          ) : unit.status === 'in-progress' ? (
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{unit.unit}</p>
                          <p className="text-sm text-slate-600 capitalize">{unit.status.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-700">{unit.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${selectedCourse.color} transition-all duration-500`}
                        style={{ width: `${unit.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics Covered */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Topics This Term</h3>
              <div className="flex flex-wrap gap-3">
                {selectedCourse.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Textbook References */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Textbook Chapters</h3>
              <div className="space-y-3">
                {selectedCourse.textbookReferences.map((reference, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{reference.chapter}</p>
                      <p className="text-sm text-slate-600">Pages: {reference.pages}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Pending Assignments</h3>
              <div className="space-y-3">
                {selectedCourse.assignments.map((assignment, index) => (
                  <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 mb-1">{assignment.title}</p>
                        <p className="text-sm text-slate-700 mb-2">{assignment.instruction}</p>
                        <p className="text-sm text-slate-600">
                          Due: {new Date(assignment.dueDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-semibold flex-shrink-0 ml-3">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Resources & Past Exams */}
          <div className="space-y-6">
            {/* Learning Resources */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Learning Resources</h3>
              <div className="space-y-3">
                {selectedCourse.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{resource.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                            {resource.type}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(resource.date).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Past Exams */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Your Exam Results</h3>
              <div className="space-y-3">
                {selectedCourse.pastExams.map((exam, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-slate-800">{exam.title}</p>
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-slate-800">{exam.marks}</span>
                      <span className="text-slate-600">/ {exam.outOf}</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {new Date(exam.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Note about marking */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">About Resources</p>
                  <p className="text-xs text-blue-800">
                    Past papers are for practice only. Submit your work to your teacher for marking and feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;