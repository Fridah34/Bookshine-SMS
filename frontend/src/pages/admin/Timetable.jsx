import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Save,
  BookOpen,
  Users,
  Clock,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  GraduationCap
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const PERIODS = [
  { id: 'assembly', label: 'Assembly',  time: '7:30 – 8:00',   type: 'common' },
  { id: 'p1',      label: 'Period 1',  time: '8:00 – 8:40',   type: 'lesson' },
  { id: 'p2',      label: 'Period 2',  time: '8:40 – 9:20',   type: 'lesson' },
  { id: 'p3',      label: 'Period 3',  time: '9:20 – 10:00',  type: 'lesson' },
  { id: 'break',   label: 'Tea Break', time: '10:00 – 10:20', type: 'break'  },
  { id: 'p4',      label: 'Period 4',  time: '10:20 – 11:00', type: 'lesson' },
  { id: 'p5',      label: 'Period 5',  time: '11:00 – 11:40', type: 'lesson' },
  { id: 'p6',      label: 'Period 6',  time: '11:40 – 12:20', type: 'lesson' },
  { id: 'p7',      label: 'Period 7',  time: '12:20 – 1:00',  type: 'lesson' },
  { id: 'lunch',   label: 'Lunch',     time: '1:00 – 2:00',   type: 'break'  },
  { id: 'p8',      label: 'Period 8',  time: '2:00 – 2:40',   type: 'lesson' },
  { id: 'p9',      label: 'Period 9',  time: '2:40 – 3:20',   type: 'lesson' },
  { id: 'p10',     label: 'Period 10', time: '3:20 – 4:00',   type: 'lesson' },
  { id: 'games',   label: 'Games',     time: '4:00 – 5:00',   type: 'common' },
];

const SUBJECTS = [
  'Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics',
  'Biology', 'History', 'Geography', 'Business Studies', 'Computer Studies',
  'Agriculture', 'Home Science', 'CRE', 'IRE', 'Art & Design',
  'Music', 'Physical Education', 'Life Skills',
];

const TEACHERS = [
  'Mr. James Kimani', 'Mrs. Grace Wanjiru', 'Mr. David Omondi',
  'Mrs. Mary Akinyi', 'Mr. Peter Mutua', 'Mrs. Sarah Njoroge',
  'Mr. Michael Mwangi', 'Mwalimu Omondi', 'Dr. Mutua',
  'Mr. Kipchoge', 'Mrs. Wambui', 'Mrs. Chepkemoi',
];

const SUBJECT_COLORS = {
  'Mathematics':      'bg-blue-100 text-blue-800 border-blue-200',
  'English':          'bg-purple-100 text-purple-800 border-purple-200',
  'Kiswahili':        'bg-green-100 text-green-800 border-green-200',
  'Chemistry':        'bg-teal-100 text-teal-800 border-teal-200',
  'Physics':          'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Biology':          'bg-emerald-100 text-emerald-800 border-emerald-200',
  'History':          'bg-amber-100 text-amber-800 border-amber-200',
  'Geography':        'bg-lime-100 text-lime-800 border-lime-200',
  'Business Studies': 'bg-orange-100 text-orange-800 border-orange-200',
  'Computer Studies': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'CRE':              'bg-rose-100 text-rose-800 border-rose-200',
  'Physical Education':'bg-sky-100 text-sky-800 border-sky-200',
  'Life Skills':      'bg-pink-100 text-pink-800 border-pink-200',
};

const defaultColor = 'bg-slate-100 text-slate-700 border-slate-200';

// ── Mock timetable data keyed by "Form|Stream" ───────────────────────────────
const buildInitialTimetable = () => {
  // Form 3 Science A — full sample
  const f3sa = {};
  const f3saData = {
    Monday:    { p1: ['Mathematics','Mr. James Kimani','Room 301'], p2: ['English','Mrs. Grace Wanjiru','Room 301'], p3: ['Kiswahili','Mwalimu Omondi','Room 301'], p4: ['Chemistry','Dr. Mutua','Lab 2'], p5: ['Physics','Mr. Kipchoge','Lab 3'], p6: ['Biology','Mrs. Mary Akinyi','Lab 1'], p7: ['History','Mr. Peter Mutua','Room 301'], p8: ['CRE','Mrs. Chepkemoi','Room 301'], p9: ['Computer Studies','Mr. Michael Mwangi','Computer Lab'], p10: ['Geography','Mrs. Wambui','Room 301'] },
    Tuesday:   { p1: ['Physics','Mr. Kipchoge','Lab 3'], p2: ['Mathematics','Mr. James Kimani','Room 301'], p3: ['Biology','Mrs. Mary Akinyi','Lab 1'], p4: ['English','Mrs. Grace Wanjiru','Room 301'], p5: ['Chemistry','Dr. Mutua','Lab 2'], p6: ['Kiswahili','Mwalimu Omondi','Room 301'], p7: ['Geography','Mrs. Wambui','Room 301'], p8: ['History','Mr. Peter Mutua','Room 301'], p9: ['Computer Studies','Mr. Michael Mwangi','Computer Lab'], p10: ['CRE','Mrs. Chepkemoi','Room 301'] },
    Wednesday: { p1: ['Chemistry','Dr. Mutua','Lab 2'], p2: ['Kiswahili','Mwalimu Omondi','Room 301'], p3: ['English','Mrs. Grace Wanjiru','Room 301'], p4: ['Mathematics','Mr. James Kimani','Room 301'], p5: ['History','Mr. Peter Mutua','Room 301'], p6: ['Physics','Mr. Kipchoge','Lab 3'], p7: ['Biology','Mrs. Mary Akinyi','Lab 1'], p8: ['Geography','Mrs. Wambui','Room 301'], p9: ['CRE','Mrs. Chepkemoi','Room 301'], p10: ['Computer Studies','Mr. Michael Mwangi','Computer Lab'] },
    Thursday:  { p1: ['Biology','Mrs. Mary Akinyi','Lab 1'], p2: ['Physics','Mr. Kipchoge','Lab 3'], p3: ['Mathematics','Mr. James Kimani','Room 301'], p4: ['History','Mr. Peter Mutua','Room 301'], p5: ['English','Mrs. Grace Wanjiru','Room 301'], p6: ['Computer Studies','Mr. Michael Mwangi','Computer Lab'], p7: ['Chemistry','Dr. Mutua','Lab 2'], p8: ['Kiswahili','Mwalimu Omondi','Room 301'], p9: ['Geography','Mrs. Wambui','Room 301'], p10: ['CRE','Mrs. Chepkemoi','Room 301'] },
    Friday:    { p1: ['English','Mrs. Grace Wanjiru','Room 301'], p2: ['Mathematics','Mr. James Kimani','Room 301'], p3: ['Chemistry','Dr. Mutua','Lab 2'], p4: ['Physics','Mr. Kipchoge','Lab 3'], p5: ['Kiswahili','Mwalimu Omondi','Room 301'], p6: ['Biology','Mrs. Mary Akinyi','Lab 1'], p7: ['Life Skills','Mrs. Grace Wanjiru','Room 301'] },
  };
  DAYS.forEach(day => { f3sa[day] = f3saData[day] || {}; });

  return { 'Form 3|Science A': f3sa };
};

const CLASSES = [
  { form: 'Form 1', streams: ['East A', 'East B', 'West A', 'West B'] },
  { form: 'Form 2', streams: ['North A', 'North B', 'South A', 'South B'] },
  { form: 'Form 3', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] },
  { form: 'Form 4', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Timetable = () => {
  const [view, setView]               = useState('overview');  // overview | grid | add-entry
  const [selectedForm, setSelectedForm]     = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [activeDay, setActiveDay]           = useState('Monday');

  const [timetables, setTimetables] = useState(buildInitialTimetable);

  // Modal state
  const [showModal, setShowModal]   = useState(false);
  const [editCell, setEditCell]     = useState(null);   // { day, periodId }
  const [cellForm, setCellForm]     = useState({ subject: '', teacher: '', room: '' });

  const classKey = `${selectedForm}|${selectedStream}`;
  const classTimetable = timetables[classKey] || {};

  const getCell = (day, periodId) => classTimetable[day]?.[periodId] || null;

  const saveCell = () => {
    if (!editCell) return;
    const { day, periodId } = editCell;
    setTimetables(prev => ({
      ...prev,
      [classKey]: {
        ...prev[classKey],
        [day]: {
          ...prev[classKey]?.[day],
          [periodId]: cellForm.subject ? [cellForm.subject, cellForm.teacher, cellForm.room] : undefined,
        }
      }
    }));
    setShowModal(false);
    setEditCell(null);
    setCellForm({ subject: '', teacher: '', room: '' });
  };

  const clearCell = (day, periodId) => {
    if (!window.confirm('Remove this period entry?')) return;
    setTimetables(prev => {
      const updated = { ...prev[classKey] };
      if (updated[day]) {
        const dayData = { ...updated[day] };
        delete dayData[periodId];
        updated[day] = dayData;
      }
      return { ...prev, [classKey]: updated };
    });
  };

  const openModal = (day, period) => {
    const cell = getCell(day, period.id);
    setEditCell({ day, periodId: period.id });
    setCellForm({
      subject: cell?.[0] || '',
      teacher: cell?.[1] || '',
      room:    cell?.[2] || '',
    });
    setShowModal(true);
  };

  // Stats
  const scheduledClasses = Object.keys(timetables).length;
  const totalSlots = DAYS.length * PERIODS.filter(p => p.type === 'lesson').length;

  // ── Edit Modal ──────────────────────────────────────────────────────────────
  const EditModal = () => {
    const period = PERIODS.find(p => p.id === editCell?.periodId);
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {cellForm.subject ? 'Edit Period' : 'Add Period'}
              </h3>
              <p className="text-sm text-slate-500">
                {editCell?.day} — {period?.label} ({period?.time})
              </p>
            </div>
            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-slate-100 rounded-lg">
              <X size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
              <select value={cellForm.subject}
                onChange={e => setCellForm({ ...cellForm, subject: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
                <option value="">Select Subject</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Teacher *</label>
              <select value={cellForm.teacher}
                onChange={e => setCellForm({ ...cellForm, teacher: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
                <option value="">Select Teacher</option>
                {TEACHERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Room / Venue</label>
              <input type="text" value={cellForm.room}
                onChange={e => setCellForm({ ...cellForm, room: e.target.value })}
                placeholder="e.g. Room 301, Lab 2"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" />
            </div>
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
            <button onClick={() => setShowModal(false)}
              className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              Cancel
            </button>
            <button onClick={saveCell}
              disabled={!cellForm.subject || !cellForm.teacher}
              className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm disabled:opacity-50">
              <Save size={16} /> Save Period
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // OVERVIEW
  // ══════════════════════════════════════════════════════════════════════════════
  if (view === 'overview') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Timetable Management</h1>
            <p className="text-slate-600 mt-1">View and manage weekly class timetables — Term 1, 2026</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Classes',    value: CLASSES.reduce((s, c) => s + c.streams.length, 0), icon: BookOpen, color: 'bg-emerald-100 text-emerald-600' },
            { label: 'Scheduled',        value: scheduledClasses,  icon: Calendar,     color: 'bg-green-100 text-green-600' },
            { label: 'Lesson Periods',   value: PERIODS.filter(p => p.type === 'lesson').length + ' / day', icon: Clock,  color: 'bg-blue-100 text-blue-600' },
            { label: 'Teaching Staff',   value: TEACHERS.length,   icon: Users,        color: 'bg-purple-100 text-purple-600' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Class cards by form */}
        {CLASSES.map(classItem => (
          <div key={classItem.form}>
            <h3 className="text-lg font-bold text-slate-800 mb-3">{classItem.form}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {classItem.streams.map(stream => {
                const key = `${classItem.form}|${stream}`;
                const hasData = !!timetables[key];
                const lessonPeriods = PERIODS.filter(p => p.type === 'lesson');
                let filledCount = 0;
                if (hasData) {
                  DAYS.forEach(day => {
                    lessonPeriods.forEach(p => {
                      if (timetables[key][day]?.[p.id]) filledCount++;
                    });
                  });
                }
                const totalLessonSlots = DAYS.length * lessonPeriods.length;
                const fillPct = hasData ? Math.round((filledCount / totalLessonSlots) * 100) : 0;

                return (
                  <div key={stream} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="text-emerald-600" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{stream}</p>
                        <p className="text-xs text-slate-500">{classItem.form}</p>
                      </div>
                    </div>

                    {hasData ? (
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${fillPct === 100 ? 'bg-green-500' : fillPct > 0 ? 'bg-yellow-500' : 'bg-slate-300'}`}
                              style={{ width: `${fillPct}%` }} />
                          </div>
                          <span className="text-xs text-slate-600 font-semibold">{fillPct}%</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{filledCount}/{totalLessonSlots} slots filled</p>
                      </>
                    ) : (
                      <p className="text-xs text-slate-400 mb-3 italic">No timetable yet</p>
                    )}

                    <button
                      onClick={() => {
                        setSelectedForm(classItem.form);
                        setSelectedStream(stream);
                        setActiveDay('Monday');
                        setView('grid');
                      }}
                      className="w-full py-2 text-sm font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      {hasData ? 'View / Edit →' : 'Create Timetable →'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // GRID VIEW
  // ══════════════════════════════════════════════════════════════════════════════
  if (view === 'grid') {
    // Lessons count stats
    const lessonPeriods = PERIODS.filter(p => p.type === 'lesson');
    const totalFilledToday = lessonPeriods.filter(p => getCell(activeDay, p.id)).length;
    const subjectSet = new Set();
    DAYS.forEach(day => lessonPeriods.forEach(p => {
      const c = getCell(day, p.id);
      if (c) subjectSet.add(c[0]);
    }));

    return (
      <div className="space-y-6">
        {showModal && <EditModal />}

        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => setView('overview')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">{selectedForm} — {selectedStream}</h1>
            <p className="text-slate-600 mt-1">Weekly timetable • Term 1, 2026</p>
          </div>
          {/* Class switcher */}
          <div className="flex items-center gap-2">
            <select value={selectedForm}
              onChange={e => { setSelectedForm(e.target.value); setSelectedStream(CLASSES.find(c => c.form === e.target.value)?.streams[0] || ''); }}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
              {CLASSES.map(c => <option key={c.form} value={c.form}>{c.form}</option>)}
            </select>
            <select value={selectedStream} onChange={e => setSelectedStream(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
              {CLASSES.find(c => c.form === selectedForm)?.streams.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: `${activeDay} lessons`, value: `${totalFilledToday} / ${lessonPeriods.length}`, icon: BookOpen, color: 'bg-emerald-100 text-emerald-600' },
            { label: 'Subjects this week', value: subjectSet.size, icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
            { label: 'Periods per day',    value: lessonPeriods.length, icon: Clock,  color: 'bg-purple-100 text-purple-600' },
            { label: 'School days',        value: DAYS.length,          icon: Calendar, color: 'bg-indigo-100 text-indigo-600' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-600">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 bg-white rounded-lg shadow-sm border border-slate-200 p-3">
          {DAYS.map(day => {
            const filledToday = lessonPeriods.filter(p => getCell(day, p.id)).length;
            return (
              <button key={day}
                onClick={() => setActiveDay(day)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                  activeDay === day
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div>{day.slice(0, 3)}</div>
                <div className={`text-xs mt-0.5 ${activeDay === day ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {filledToday}/{lessonPeriods.length}
                </div>
              </button>
            );
          })}
        </div>

        {/* Timetable periods for active day */}
        <div className="space-y-2">
          {PERIODS.map(period => {
            const cell = getCell(activeDay, period.id);
            const subjectColor = cell ? (SUBJECT_COLORS[cell[0]] || defaultColor) : '';

            // ── Break / Common rows ──────────────────────────
            if (period.type === 'break') {
              return (
                <div key={period.id}
                  className="flex items-center gap-4 px-5 py-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="w-24 flex-shrink-0">
                    <p className="text-xs font-bold text-amber-700 uppercase">{period.label}</p>
                    <p className="text-xs text-amber-600 font-mono mt-0.5">{period.time}</p>
                  </div>
                  <p className="text-sm text-amber-700 font-medium">
                    {period.id === 'lunch' ? '🍽️  Lunch Break — All Students' : '☕  Tea Break — All Students'}
                  </p>
                </div>
              );
            }

            if (period.type === 'common') {
              const commonLabel = period.id === 'assembly'
                ? '🔔  Morning Assembly — All Students'
                : '⚽  Games & Sports — All Students';
              return (
                <div key={period.id}
                  className="flex items-center gap-4 px-5 py-3 bg-slate-100 border border-slate-200 rounded-lg">
                  <div className="w-24 flex-shrink-0">
                    <p className="text-xs font-bold text-slate-600 uppercase">{period.label}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{period.time}</p>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">{commonLabel}</p>
                </div>
              );
            }

            // ── Lesson row ───────────────────────────────────
            return (
              <div key={period.id}
                className={`flex items-center gap-4 bg-white rounded-lg shadow-sm border transition-shadow hover:shadow-md ${
                  cell ? 'border-slate-200' : 'border-dashed border-slate-300'
                }`}
              >
                {/* Period label */}
                <div className="w-24 flex-shrink-0 px-4 py-4 border-r border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase">{period.label}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{period.time}</p>
                </div>

                {/* Content */}
                <div className="flex-1 px-2 py-3">
                  {cell ? (
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Subject badge */}
                      <span className={`px-3 py-1 rounded-full text-sm font-bold border ${subjectColor}`}>
                        {cell[0]}
                      </span>
                      {/* Teacher */}
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Users size={14} className="text-slate-400" />
                        <span>{cell[1]}</span>
                      </div>
                      {/* Room */}
                      {cell[2] && (
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          <span>{cell[2]}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 italic">No class assigned</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 pr-4 flex-shrink-0">
                  <button onClick={() => openModal(activeDay, period)}
                    className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600"
                    title={cell ? 'Edit' : 'Add'}>
                    {cell ? <Edit size={16} /> : <Plus size={16} />}
                  </button>
                  {cell && (
                    <button onClick={() => clearCell(activeDay, period.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                      title="Remove">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* All-week summary table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Full Week Overview</h3>
            <p className="text-sm text-slate-500 mt-0.5">All lesson periods — {selectedForm} {selectedStream}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-28">Period</th>
                  {DAYS.map(day => (
                    <th key={day} className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${day === activeDay ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
                      {day.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PERIODS.map(period => {
                  if (period.type === 'break' || period.type === 'common') {
                    return (
                      <tr key={period.id} className="bg-slate-50">
                        <td className="px-4 py-2">
                          <p className="text-xs font-bold text-slate-500 uppercase">{period.label}</p>
                          <p className="text-xs text-slate-400 font-mono">{period.time}</p>
                        </td>
                        <td colSpan={5} className="px-4 py-2 text-xs text-slate-400 italic">
                          {period.type === 'break'
                            ? (period.id === 'lunch' ? 'Lunch Break' : 'Tea Break')
                            : (period.id === 'assembly' ? 'Morning Assembly' : 'Games & Sports')}
                          {' '}— All Students
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={period.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2">
                        <p className="text-xs font-semibold text-slate-600">{period.label}</p>
                        <p className="text-xs text-slate-400 font-mono">{period.time}</p>
                      </td>
                      {DAYS.map(day => {
                        const cell = getCell(day, period.id);
                        const color = cell ? (SUBJECT_COLORS[cell[0]] || defaultColor) : '';
                        return (
                          <td key={day}
                            className={`px-4 py-2 cursor-pointer transition-colors ${day === activeDay ? 'bg-emerald-50/60' : ''}`}
                            onClick={() => { setActiveDay(day); openModal(day, period); }}
                          >
                            {cell ? (
                              <div>
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
                                  {cell[0]}
                                </span>
                                <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[120px]">{cell[1]}</p>
                              </div>
                            ) : (
                              <span className="text-slate-300 text-xs">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Timetable;