import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  Calendar,
  BarChart2,
  PieChart,
  FileText,
  Award,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Printer,
  Filter,
} from 'lucide-react';

// ── Mock Data ─────────────────────────────────────────────────────────────────

const ATTENDANCE_WEEKLY = [
  { day: 'Mon', present: 312, absent: 18, late: 10 },
  { day: 'Tue', present: 298, absent: 28, late: 14 },
  { day: 'Wed', present: 320, absent: 14, late: 6  },
  { day: 'Thu', present: 305, absent: 22, late: 13 },
  { day: 'Fri', present: 290, absent: 35, late: 15 },
];

const FORM_PERFORMANCE = [
  { form: 'Form 1', mean: 62.4, grade: 'C+', top: 'Algebra', weak: 'Chemistry', students: 120, passed: 88 },
  { form: 'Form 2', mean: 65.7, grade: 'B-', top: 'Biology', weak: 'Kiswahili', students: 108, passed: 82 },
  { form: 'Form 3', mean: 58.9, grade: 'C',  top: 'History', weak: 'Physics',   students: 96,  passed: 70 },
  { form: 'Form 4', mean: 71.2, grade: 'B',  top: 'English', weak: 'Math',      students: 88,  passed: 79 },
];

const SUBJECT_PERFORMANCE = [
  { subject: 'Mathematics',  mean: 58.1, pass: 62 },
  { subject: 'English',      mean: 72.4, pass: 88 },
  { subject: 'Kiswahili',    mean: 69.8, pass: 82 },
  { subject: 'Chemistry',    mean: 61.2, pass: 71 },
  { subject: 'Physics',      mean: 59.7, pass: 65 },
  { subject: 'Biology',      mean: 67.5, pass: 79 },
  { subject: 'History',      mean: 73.1, pass: 90 },
  { subject: 'Geography',    mean: 70.2, pass: 85 },
  { subject: 'CRE',          mean: 74.5, pass: 91 },
];

const TOP_STUDENTS = [
  { rank: 1, name: 'Grace Wanjiru',   form: 'Form 4', stream: 'Science A', avg: 86.4, grade: 'A-' },
  { rank: 2, name: 'Kelvin Ochieng',  form: 'Form 4', stream: 'Science A', avg: 84.2, grade: 'A-' },
  { rank: 3, name: 'Diana Wekesa',    form: 'Form 4', stream: 'Science B', avg: 82.7, grade: 'B+' },
  { rank: 4, name: 'Peter Mutua',     form: 'Form 3', stream: 'Science A', avg: 81.5, grade: 'B+' },
  { rank: 5, name: 'Cynthia Auma',    form: 'Form 3', stream: 'Arts A',    avg: 80.0, grade: 'B+' },
  { rank: 6, name: 'Ann Wambui',      form: 'Form 2', stream: 'North A',   avg: 79.3, grade: 'B'  },
  { rank: 7, name: 'James Otieno',    form: 'Form 4', stream: 'Arts A',    avg: 78.8, grade: 'B'  },
  { rank: 8, name: 'Mercy Atieno',    form: 'Form 2', stream: 'North B',   avg: 78.1, grade: 'B'  },
];

const FEE_MONTHLY = [
  { month: 'Jan', collected: 1820000, target: 2100000 },
  { month: 'Feb', collected: 1540000, target: 2100000 },
  { month: 'Mar', collected: 1950000, target: 2100000 },
  { month: 'Apr', collected: 1680000, target: 2100000 },
  { month: 'May', collected: 1720000, target: 2100000 },
  { month: 'Jun', collected: 900000,  target: 2100000 },
];

const ATTENDANCE_BY_FORM = [
  { form: 'Form 1', rate: 91.2 },
  { form: 'Form 2', rate: 88.4 },
  { form: 'Form 3', rate: 85.7 },
  { form: 'Form 4', rate: 93.1 },
];

const REPORT_TYPES = [
  { id: 'academic',    label: 'Academic Performance', icon: BookOpen,   desc: 'Mean scores, grades, subject analysis',    color: 'bg-blue-100 text-blue-600' },
  { id: 'attendance',  label: 'Attendance Report',    icon: Users,      desc: 'Daily, weekly and per-form attendance',    color: 'bg-emerald-100 text-emerald-600' },
  { id: 'fee',         label: 'Fee Collection',       icon: DollarSign, desc: 'Payments, outstanding balances, trends',   color: 'bg-purple-100 text-purple-600' },
  { id: 'top-students',label: 'Top Students',         icon: Award,      desc: 'Best performers across all forms',         color: 'bg-amber-100 text-amber-600' },
];

const fmt  = (n) => `KSh ${Number(n).toLocaleString()}`;
const pct  = (n) => `${Number(n).toFixed(1)}%`;
const maxVal = (arr, key) => Math.max(...arr.map(r => r[key]));

// ── Mini bar chart ─────────────────────────────────────────────────────────────
const MiniBar = ({ value, max, color = 'bg-emerald-500', height = 'h-2' }) => (
  <div className={`w-full bg-slate-200 rounded-full ${height}`}>
    <div className={`${height} rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
  </div>
);

// ── Grade color ───────────────────────────────────────────────────────────────
const gradeColor = (grade) => {
  if (['A', 'A-', 'A+'].includes(grade)) return 'bg-green-100 text-green-700';
  if (['B+', 'B', 'B-'].includes(grade))  return 'bg-blue-100 text-blue-700';
  if (['C+', 'C', 'C-'].includes(grade))  return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

// ── Component ─────────────────────────────────────────────────────────────────
const Reports = () => {
  const [activeReport, setActiveReport] = useState(null); // null = overview
  const [selectedTerm, setSelectedTerm] = useState('Term 1, 2026');
  const [selectedForm,  setSelectedForm]  = useState('all');

  const totalStudents  = FORM_PERFORMANCE.reduce((s, r) => s + r.students, 0);
  const overallMean    = (FORM_PERFORMANCE.reduce((s, r) => s + r.mean, 0) / FORM_PERFORMANCE.length).toFixed(1);
  const totalCollected = FEE_MONTHLY.reduce((s, r) => s + r.collected, 0);
  const totalTarget    = FEE_MONTHLY.reduce((s, r) => s + r.target, 0);
  const feeRate        = ((totalCollected / totalTarget) * 100).toFixed(1);
  const avgAttendance  = (ATTENDANCE_BY_FORM.reduce((s, r) => s + r.rate, 0) / ATTENDANCE_BY_FORM.length).toFixed(1);

  // ── OVERVIEW ────────────────────────────────────────────────────────────────
  if (!activeReport) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>
            <p className="text-slate-600 mt-1">School performance summary — {selectedTerm}</p>
          </div>
          <div className="flex gap-3">
            <select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500">
              <option>Term 1, 2026</option>
              <option>Term 3, 2025</option>
              <option>Term 2, 2025</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              <Printer size={18} /> Print All
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm">
              <Download size={18} /> Export PDF
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students',    value: totalStudents,     suffix: '', icon: Users,     color: 'bg-blue-100 text-blue-600',    trend: '+12 this term', up: true },
            { label: 'School Mean Score', value: overallMean,       suffix: '%', icon: BarChart2, color: 'bg-emerald-100 text-emerald-600', trend: '+2.4% vs last term', up: true },
            { label: 'Fee Collection',    value: `${feeRate}%`,     suffix: '', icon: DollarSign, color: 'bg-purple-100 text-purple-600', trend: '-3.1% vs last term', up: false },
            { label: 'Avg Attendance',    value: `${avgAttendance}%`, suffix: '', icon: Calendar, color: 'bg-amber-100 text-amber-600',   trend: '+1.2% vs last term', up: true },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {stat.trend}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Report type cards */}
        <h2 className="text-lg font-bold text-slate-800">Generate Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REPORT_TYPES.map(r => {
            const Icon = r.icon;
            return (
              <button key={r.id} onClick={() => setActiveReport(r.id)}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${r.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{r.label}</h3>
                <p className="text-sm text-slate-500">{r.desc}</p>
                <div className="mt-4 text-xs font-semibold text-emerald-600">View Report →</div>
              </button>
            );
          })}
        </div>

        {/* Two-column snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Attendance by form */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Attendance by Form</h3>
              <button onClick={() => setActiveReport('attendance')} className="text-xs text-emerald-600 font-semibold hover:underline">Full Report →</button>
            </div>
            <div className="space-y-4">
              {ATTENDANCE_BY_FORM.map(item => (
                <div key={item.form}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{item.form}</span>
                    <span className={`font-bold ${item.rate >= 90 ? 'text-green-600' : item.rate >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>{pct(item.rate)}</span>
                  </div>
                  <MiniBar value={item.rate} max={100}
                    color={item.rate >= 90 ? 'bg-green-500' : item.rate >= 85 ? 'bg-yellow-500' : 'bg-red-500'} />
                </div>
              ))}
            </div>
          </div>

          {/* Academic performance snapshot */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Mean Score by Form</h3>
              <button onClick={() => setActiveReport('academic')} className="text-xs text-emerald-600 font-semibold hover:underline">Full Report →</button>
            </div>
            <div className="space-y-4">
              {FORM_PERFORMANCE.map(item => (
                <div key={item.form}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{item.form}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${gradeColor(item.grade)}`}>{item.grade}</span>
                      <span className="font-bold text-slate-700">{item.mean.toFixed(1)}%</span>
                    </div>
                  </div>
                  <MiniBar value={item.mean} max={100}
                    color={item.mean >= 70 ? 'bg-emerald-500' : item.mean >= 55 ? 'bg-blue-500' : 'bg-amber-500'} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fee trend mini-chart */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Fee Collection Trend — 2026</h3>
              <p className="text-sm text-slate-500 mt-0.5">Monthly collected vs target</p>
            </div>
            <button onClick={() => setActiveReport('fee')} className="text-xs text-emerald-600 font-semibold hover:underline">Full Report →</button>
          </div>
          <div className="flex items-end gap-3 h-36">
            {FEE_MONTHLY.map(m => {
              const maxH = maxVal(FEE_MONTHLY, 'target');
              const collectedH = (m.collected / maxH) * 100;
              const targetH    = (m.target    / maxH) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-1 h-28">
                    <div className="flex-1 bg-emerald-500 rounded-t-sm transition-all" style={{ height: `${collectedH}%` }} title={fmt(m.collected)} />
                    <div className="flex-1 bg-slate-200 rounded-t-sm" style={{ height: `${targetH}%` }} title={fmt(m.target)} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{m.month}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm" /><span className="text-xs text-slate-600">Collected</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 rounded-sm" /><span className="text-xs text-slate-600">Target</span></div>
          </div>
        </div>
      </div>
    );
  }

  // ── Shared back header ──────────────────────────────────────────────────────
  const BackHeader = ({ title, subtitle }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setActiveReport(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
          <p className="text-slate-600 mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
          <Printer size={16} /> Print
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
          <Download size={16} /> Export
        </button>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════════
  // ACADEMIC PERFORMANCE
  // ══════════════════════════════════════════════════════════════════════════════
  if (activeReport === 'academic') {
    return (
      <div className="space-y-6">
        <BackHeader title="Academic Performance" subtitle={`${selectedTerm} • All forms`} />

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'School Mean',  value: `${overallMean}%`, color: 'text-emerald-600' },
            { label: 'Best Form',    value: 'Form 4',          color: 'text-blue-600' },
            { label: 'Pass Rate',    value: `${Math.round(FORM_PERFORMANCE.reduce((s,r)=>s+(r.passed/r.students),0)/FORM_PERFORMANCE.length*100)}%`, color: 'text-green-600' },
            { label: 'Students Assessed', value: totalStudents, color: 'text-slate-700' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Performance by form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Performance by Form</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Form', 'Students', 'Mean Score', 'Grade', 'Passed', 'Pass Rate', 'Top Subject', 'Weak Subject'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {FORM_PERFORMANCE.map(row => {
                  const passRate = ((row.passed / row.students) * 100).toFixed(1);
                  return (
                    <tr key={row.form} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-800">{row.form}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{row.students}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-800 w-12">{row.mean.toFixed(1)}%</span>
                          <MiniBar value={row.mean} max={100}
                            color={row.mean >= 70 ? 'bg-emerald-500' : row.mean >= 55 ? 'bg-blue-500' : 'bg-amber-500'} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${gradeColor(row.grade)}`}>{row.grade}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{row.passed}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-bold ${parseFloat(passRate) >= 80 ? 'text-green-600' : parseFloat(passRate) >= 65 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {passRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">{row.top}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">{row.weak}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject performance */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Subject Performance</h3>
            <p className="text-sm text-slate-500 mt-0.5">Average mean score and pass rate across all forms</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['#', 'Subject', 'Mean Score', 'Pass Rate', 'Status'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[...SUBJECT_PERFORMANCE].sort((a, b) => b.mean - a.mean).map((s, i) => (
                  <tr key={s.subject} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{s.subject}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-800 w-12">{s.mean.toFixed(1)}%</span>
                        <div className="w-32">
                          <MiniBar value={s.mean} max={100}
                            color={s.mean >= 70 ? 'bg-emerald-500' : s.mean >= 55 ? 'bg-yellow-500' : 'bg-red-500'} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{s.pass}%</td>
                    <td className="px-6 py-4">
                      {s.pass >= 80
                        ? <span className="flex items-center gap-1 text-green-600 text-xs font-semibold"><CheckCircle size={14} /> Strong</span>
                        : s.pass >= 65
                        ? <span className="flex items-center gap-1 text-yellow-600 text-xs font-semibold"><AlertCircle size={14} /> Average</span>
                        : <span className="flex items-center gap-1 text-red-600 text-xs font-semibold"><TrendingDown size={14} /> Needs Attention</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // ATTENDANCE REPORT
  // ══════════════════════════════════════════════════════════════════════════════
  if (activeReport === 'attendance') {
    const totalPresent = ATTENDANCE_WEEKLY.reduce((s, r) => s + r.present, 0);
    const totalAbsent  = ATTENDANCE_WEEKLY.reduce((s, r) => s + r.absent, 0);
    const totalLate    = ATTENDANCE_WEEKLY.reduce((s, r) => s + r.late, 0);
    const weeklyRate   = ((totalPresent / (totalPresent + totalAbsent + totalLate)) * 100).toFixed(1);

    return (
      <div className="space-y-6">
        <BackHeader title="Attendance Report" subtitle={`${selectedTerm} • Week summary`} />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Rate',   value: `${weeklyRate}%`, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
            { label: 'Total Present', value: totalPresent,     color: 'text-green-600',   bg: 'bg-green-50 border-green-200' },
            { label: 'Total Absent',  value: totalAbsent,      color: 'text-red-600',     bg: 'bg-red-50 border-red-200' },
            { label: 'Late Arrivals', value: totalLate,        color: 'text-yellow-600',  bg: 'bg-yellow-50 border-yellow-200' },
          ].map(s => (
            <div key={s.label} className={`rounded-lg border p-4 text-center ${s.bg}`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-slate-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Daily breakdown bar chart */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-5">Daily Attendance This Week</h3>
          <div className="flex items-end gap-4 h-44">
            {ATTENDANCE_WEEKLY.map(d => {
              const total = d.present + d.absent + d.late;
              const pPct  = (d.present / total) * 100;
              const aPct  = (d.absent  / total) * 100;
              const lPct  = (d.late    / total) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col-reverse items-center gap-0.5 h-36">
                    {/* Stacked bar */}
                    <div className="w-12 flex flex-col-reverse rounded-lg overflow-hidden h-full">
                      <div className="bg-green-500 w-full transition-all" style={{ height: `${pPct}%` }} title={`Present: ${d.present}`} />
                      <div className="bg-yellow-400 w-full transition-all" style={{ height: `${lPct}%` }} title={`Late: ${d.late}`} />
                      <div className="bg-red-400 w-full transition-all" style={{ height: `${aPct}%` }} title={`Absent: ${d.absent}`} />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{d.day}</p>
                  <p className="text-xs text-slate-400">{d.present + d.absent + d.late} total</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-sm" /><span className="text-xs text-slate-600">Present</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-sm" /><span className="text-xs text-slate-600">Late</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded-sm" /><span className="text-xs text-slate-600">Absent</span></div>
          </div>
        </div>

        {/* By form table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Attendance Rate by Form</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Form', 'Attendance Rate', 'Progress', 'Status'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ATTENDANCE_BY_FORM.map(row => (
                  <tr key={row.form} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-800">{row.form}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{pct(row.rate)}</td>
                    <td className="px-6 py-4 w-48">
                      <MiniBar value={row.rate} max={100}
                        color={row.rate >= 90 ? 'bg-green-500' : row.rate >= 85 ? 'bg-yellow-500' : 'bg-red-500'}
                        height="h-3" />
                    </td>
                    <td className="px-6 py-4">
                      {row.rate >= 90
                        ? <span className="flex items-center gap-1 text-green-600 text-xs font-semibold"><CheckCircle size={14} /> Excellent</span>
                        : row.rate >= 85
                        ? <span className="flex items-center gap-1 text-yellow-600 text-xs font-semibold"><AlertCircle size={14} /> Satisfactory</span>
                        : <span className="flex items-center gap-1 text-red-600 text-xs font-semibold"><TrendingDown size={14} /> Needs Improvement</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily detail table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Daily Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Day', 'Present', 'Absent', 'Late', 'Total', 'Rate'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ATTENDANCE_WEEKLY.map(d => {
                  const total = d.present + d.absent + d.late;
                  const rate = ((d.present / total) * 100).toFixed(1);
                  return (
                    <tr key={d.day} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-800">{d.day}</td>
                      <td className="px-6 py-4"><span className="text-sm font-semibold text-green-700">{d.present}</span></td>
                      <td className="px-6 py-4"><span className="text-sm font-semibold text-red-600">{d.absent}</span></td>
                      <td className="px-6 py-4"><span className="text-sm font-semibold text-yellow-600">{d.late}</span></td>
                      <td className="px-6 py-4 text-sm text-slate-700">{total}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-bold ${parseFloat(rate) >= 90 ? 'text-green-600' : parseFloat(rate) >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {rate}%
                        </span>
                      </td>
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

  // ══════════════════════════════════════════════════════════════════════════════
  // FEE COLLECTION REPORT
  // ══════════════════════════════════════════════════════════════════════════════
  if (activeReport === 'fee') {
    const totalCollectedFee = FEE_MONTHLY.reduce((s, r) => s + r.collected, 0);
    const totalTargetFee    = FEE_MONTHLY.reduce((s, r) => s + r.target, 0);
    const totalOutstanding  = totalTargetFee - totalCollectedFee;

    const feeByForm = [
      { form: 'Form 1', expected: 7800000,  collected: 6890000,  students: 120, paid: 72, partial: 30, unpaid: 18 },
      { form: 'Form 2', expected: 7344000,  collected: 6120000,  students: 108, paid: 65, partial: 28, unpaid: 15 },
      { form: 'Form 3', expected: 6912000,  collected: 5540000,  students: 96,  paid: 58, partial: 22, unpaid: 16 },
      { form: 'Form 4', expected: 6600000,  collected: 5940000,  students: 88,  paid: 70, partial: 12, unpaid: 6  },
    ];

    return (
      <div className="space-y-6">
        <BackHeader title="Fee Collection Report" subtitle={`${selectedTerm} • All forms`} />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Expected',   value: fmt(totalTargetFee),    color: 'text-slate-800' },
            { label: 'Total Collected',  value: fmt(totalCollectedFee), color: 'text-green-700' },
            { label: 'Outstanding',      value: fmt(totalOutstanding),  color: 'text-red-600'   },
            { label: 'Collection Rate',  value: `${feeRate}%`,          color: 'text-emerald-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Monthly chart */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-5">Monthly Collection vs Target</h3>
          <div className="flex items-end gap-4 h-48">
            {FEE_MONTHLY.map(m => {
              const maxH   = maxVal(FEE_MONTHLY, 'target');
              const colH   = (m.collected / maxH) * 100;
              const tarH   = 100;
              const colPct = ((m.collected / m.target) * 100).toFixed(0);
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <p className="text-xs text-slate-500 font-semibold mb-1">{colPct}%</p>
                  <div className="w-full flex items-end gap-1 h-36">
                    <div className="flex-1 bg-emerald-500 rounded-t" style={{ height: `${colH}%` }} title={fmt(m.collected)} />
                    <div className="flex-1 bg-slate-200 rounded-t" style={{ height: `${tarH}%` }} title={fmt(m.target)} />
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{m.month}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-5 mt-3">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"/><span className="text-xs text-slate-600">Collected</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 rounded-sm"/><span className="text-xs text-slate-600">Target</span></div>
          </div>
        </div>

        {/* By form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Fee Status by Form</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Form', 'Students', 'Expected', 'Collected', 'Outstanding', 'Rate', 'Fully Paid', 'Partial', 'Unpaid'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {feeByForm.map(row => {
                  const rate = ((row.collected / row.expected) * 100).toFixed(1);
                  return (
                    <tr key={row.form} className="hover:bg-slate-50">
                      <td className="px-4 py-4 font-bold text-slate-800">{row.form}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{row.students}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{fmt(row.expected)}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-green-700">{fmt(row.collected)}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-red-600">{fmt(row.expected - row.collected)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700 w-10">{rate}%</span>
                          <div className="w-16">
                            <MiniBar value={parseFloat(rate)} max={100}
                              color={parseFloat(rate) >= 85 ? 'bg-green-500' : parseFloat(rate) >= 70 ? 'bg-yellow-500' : 'bg-red-500'} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{row.paid}</span></td>
                      <td className="px-4 py-4"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">{row.partial}</span></td>
                      <td className="px-4 py-4"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">{row.unpaid}</span></td>
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

  // ══════════════════════════════════════════════════════════════════════════════
  // TOP STUDENTS
  // ══════════════════════════════════════════════════════════════════════════════
  if (activeReport === 'top-students') {
    return (
      <div className="space-y-6">
        <BackHeader title="Top Students" subtitle={`${selectedTerm} • Overall ranking`} />

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex items-center gap-3">
          <Filter size={18} className="text-slate-500" />
          <select value={selectedForm} onChange={e => setSelectedForm(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500">
            <option value="all">All Forms</option>
            {['Form 1', 'Form 2', 'Form 3', 'Form 4'].map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {/* Podium — top 3 */}
        <div className="grid grid-cols-3 gap-4">
          {[TOP_STUDENTS[1], TOP_STUDENTS[0], TOP_STUDENTS[2]].map((s, i) => {
            const podiumRank  = [2, 1, 3][i];
            const podiumColor = podiumRank === 1 ? 'border-amber-400 bg-amber-50' : podiumRank === 2 ? 'border-slate-300 bg-slate-50' : 'border-orange-300 bg-orange-50';
            const medalColor  = podiumRank === 1 ? 'bg-amber-400' : podiumRank === 2 ? 'bg-slate-400' : 'bg-orange-400';
            const rankLabel   = podiumRank === 1 ? '🥇' : podiumRank === 2 ? '🥈' : '🥉';
            return (
              <div key={s.name} className={`bg-white rounded-xl shadow-sm border-2 ${podiumColor} p-5 text-center ${podiumRank === 1 ? 'ring-2 ring-amber-300' : ''}`}>
                <div className="text-3xl mb-2">{rankLabel}</div>
                <div className={`w-12 h-12 rounded-full ${medalColor} flex items-center justify-center text-white font-bold text-xl mx-auto mb-3`}>
                  {s.name.charAt(0)}
                </div>
                <p className="font-bold text-slate-800">{s.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.form} — {s.stream}</p>
                <p className={`text-2xl font-bold mt-3 ${podiumRank === 1 ? 'text-amber-600' : 'text-slate-700'}`}>{s.avg.toFixed(1)}%</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold ${gradeColor(s.grade)}`}>{s.grade}</span>
              </div>
            );
          })}
        </div>

        {/* Full ranking table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Full Rankings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Rank', 'Student', 'Form', 'Stream', 'Average', 'Grade', 'Progress'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TOP_STUDENTS
                  .filter(s => selectedForm === 'all' || s.form === selectedForm)
                  .map(s => (
                    <tr key={s.name} className={`hover:bg-slate-50 ${s.rank <= 3 ? 'bg-amber-50/40' : ''}`}>
                      <td className="px-6 py-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          s.rank === 1 ? 'bg-amber-400 text-white' : s.rank === 2 ? 'bg-slate-300 text-white' : s.rank === 3 ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>{s.rank}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                            {s.name.charAt(0)}
                          </div>
                          <p className="font-semibold text-slate-800">{s.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{s.form}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{s.stream}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">{s.avg.toFixed(1)}%</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${gradeColor(s.grade)}`}>{s.grade}</span>
                      </td>
                      <td className="px-6 py-4 w-36">
                        <MiniBar value={s.avg} max={100}
                          color={s.avg >= 80 ? 'bg-emerald-500' : 'bg-blue-500'} height="h-2" />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Reports;