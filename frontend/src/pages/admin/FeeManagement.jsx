import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  ArrowLeft,
  Save,
  Plus,
  Eye,
  Users,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

// ── Mock Data ──────────────────────────────────────────────────────────────────
const ALL_STUDENTS = [
  { id: 1,  admissionNumber: 'SHS/2024/0001', name: 'Amani Odhiambo',   form: 'Form 1', stream: 'East A',    balance: 45000, paid: 20000, total: 65000, status: 'partial' },
  { id: 2,  admissionNumber: 'SHS/2024/0002', name: 'Grace Wanjiru',    form: 'Form 1', stream: 'East A',    balance: 0,     paid: 65000, total: 65000, status: 'paid' },
  { id: 3,  admissionNumber: 'SHS/2024/0003', name: 'David Kamau',      form: 'Form 1', stream: 'East A',    balance: 65000, paid: 0,     total: 65000, status: 'unpaid' },
  { id: 4,  admissionNumber: 'SHS/2024/0004', name: 'Faith Njeri',      form: 'Form 1', stream: 'East A',    balance: 10000, paid: 55000, total: 65000, status: 'partial' },
  { id: 5,  admissionNumber: 'SHS/2024/0005', name: 'Brian Mwangi',     form: 'Form 1', stream: 'East A',    balance: 0,     paid: 65000, total: 65000, status: 'paid' },
  { id: 6,  admissionNumber: 'SHS/2024/0006', name: 'Mercy Atieno',     form: 'Form 1', stream: 'East A',    balance: 30000, paid: 35000, total: 65000, status: 'partial' },
  { id: 7,  admissionNumber: 'SHS/2024/0007', name: 'Kevin Kipchoge',   form: 'Form 1', stream: 'East B',    balance: 65000, paid: 0,     total: 65000, status: 'unpaid' },
  { id: 8,  admissionNumber: 'SHS/2024/0008', name: 'Sharon Njoroge',   form: 'Form 1', stream: 'East B',    balance: 0,     paid: 65000, total: 65000, status: 'paid' },
  { id: 9,  admissionNumber: 'SHS/2024/0009', name: 'Isaac Mwenda',     form: 'Form 1', stream: 'East B',    balance: 15000, paid: 50000, total: 65000, status: 'partial' },
  { id: 10, admissionNumber: 'SHS/2024/0010', name: 'Lydia Chebet',     form: 'Form 1', stream: 'East B',    balance: 65000, paid: 0,     total: 65000, status: 'unpaid' },
  { id: 11, admissionNumber: 'SHS/2023/0011', name: 'Peter Mutua',      form: 'Form 2', stream: 'North A',   balance: 0,     paid: 68000, total: 68000, status: 'paid' },
  { id: 12, admissionNumber: 'SHS/2023/0012', name: 'Cynthia Auma',     form: 'Form 2', stream: 'North A',   balance: 28000, paid: 40000, total: 68000, status: 'partial' },
  { id: 13, admissionNumber: 'SHS/2023/0013', name: 'James Otieno',     form: 'Form 2', stream: 'North A',   balance: 0,     paid: 68000, total: 68000, status: 'paid' },
  { id: 14, admissionNumber: 'SHS/2023/0014', name: 'Winnie Korir',     form: 'Form 2', stream: 'North A',   balance: 68000, paid: 0,     total: 68000, status: 'unpaid' },
  { id: 15, admissionNumber: 'SHS/2023/0015', name: 'Moses Kariuki',    form: 'Form 2', stream: 'North A',   balance: 18000, paid: 50000, total: 68000, status: 'partial' },
  { id: 16, admissionNumber: 'SHS/2023/0016', name: 'Ann Wambui',       form: 'Form 2', stream: 'North B',   balance: 0,     paid: 68000, total: 68000, status: 'paid' },
  { id: 17, admissionNumber: 'SHS/2023/0017', name: 'Samuel Ngugi',     form: 'Form 2', stream: 'North B',   balance: 68000, paid: 0,     total: 68000, status: 'unpaid' },
  { id: 18, admissionNumber: 'SHS/2023/0018', name: 'Eunice Wanjiku',   form: 'Form 2', stream: 'North B',   balance: 8000,  paid: 60000, total: 68000, status: 'partial' },
  { id: 19, admissionNumber: 'SHS/2022/0019', name: 'Kelvin Ochieng',   form: 'Form 3', stream: 'Science A', balance: 0,     paid: 72000, total: 72000, status: 'paid' },
  { id: 20, admissionNumber: 'SHS/2022/0020', name: 'Brenda Muthoni',   form: 'Form 3', stream: 'Science A', balance: 22000, paid: 50000, total: 72000, status: 'partial' },
  { id: 21, admissionNumber: 'SHS/2022/0021', name: 'Victor Kiprop',    form: 'Form 3', stream: 'Science A', balance: 72000, paid: 0,     total: 72000, status: 'unpaid' },
  { id: 22, admissionNumber: 'SHS/2022/0022', name: 'Diana Wekesa',     form: 'Form 3', stream: 'Science A', balance: 0,     paid: 72000, total: 72000, status: 'paid' },
  { id: 23, admissionNumber: 'SHS/2022/0023', name: 'Charles Maina',    form: 'Form 3', stream: 'Science A', balance: 12000, paid: 60000, total: 72000, status: 'partial' },
  { id: 24, admissionNumber: 'SHS/2022/0024', name: 'Esther Adhiambo',  form: 'Form 3', stream: 'Arts A',    balance: 0,     paid: 72000, total: 72000, status: 'paid' },
  { id: 25, admissionNumber: 'SHS/2022/0025', name: 'Joseph Kamau',     form: 'Form 3', stream: 'Arts A',    balance: 72000, paid: 0,     total: 72000, status: 'unpaid' },
  { id: 26, admissionNumber: 'SHS/2022/0026', name: 'Patricia Njeri',   form: 'Form 3', stream: 'Arts A',    balance: 32000, paid: 40000, total: 72000, status: 'partial' },
  { id: 27, admissionNumber: 'SHS/2021/0027', name: 'Daniel Omondi',    form: 'Form 4', stream: 'Science A', balance: 0,     paid: 75000, total: 75000, status: 'paid' },
  { id: 28, admissionNumber: 'SHS/2021/0028', name: 'Pauline Achieng',  form: 'Form 4', stream: 'Science A', balance: 25000, paid: 50000, total: 75000, status: 'partial' },
  { id: 29, admissionNumber: 'SHS/2021/0029', name: 'Geoffrey Mwangi',  form: 'Form 4', stream: 'Science A', balance: 75000, paid: 0,     total: 75000, status: 'unpaid' },
  { id: 30, admissionNumber: 'SHS/2021/0030', name: 'Miriam Wangari',   form: 'Form 4', stream: 'Science A', balance: 0,     paid: 75000, total: 75000, status: 'paid' },
];

const FEE_STRUCTURE = [
  { form: 'Form 1', tuition: 45000, boarding: 12000, activity: 5000, development: 3000, total: 65000 },
  { form: 'Form 2', tuition: 45000, boarding: 12000, activity: 5000, development: 6000, total: 68000 },
  { form: 'Form 3', tuition: 45000, boarding: 14000, activity: 5000, development: 8000, total: 72000 },
  { form: 'Form 4', tuition: 45000, boarding: 15000, activity: 5000, development: 10000, total: 75000 },
];

const PAYMENT_HISTORY = [
  { id: 1, studentName: 'Amani Odhiambo',  admissionNumber: 'SHS/2024/0001', amount: 20000, date: '2024-09-05', method: 'M-Pesa',        reference: 'QHJ892KL',    form: 'Form 1', stream: 'East A' },
  { id: 2, studentName: 'Grace Wanjiru',   admissionNumber: 'SHS/2024/0002', amount: 65000, date: '2024-09-01', method: 'Bank Transfer',  reference: 'BNK20240901', form: 'Form 1', stream: 'East A' },
  { id: 3, studentName: 'Faith Njeri',     admissionNumber: 'SHS/2024/0004', amount: 55000, date: '2024-09-03', method: 'M-Pesa',        reference: 'MNK774JK',    form: 'Form 1', stream: 'East A' },
  { id: 4, studentName: 'Peter Mutua',     admissionNumber: 'SHS/2023/0011', amount: 68000, date: '2024-09-02', method: 'Cash',          reference: 'CSH001',      form: 'Form 2', stream: 'North A' },
  { id: 5, studentName: 'Kelvin Ochieng',  admissionNumber: 'SHS/2022/0019', amount: 72000, date: '2024-09-04', method: 'M-Pesa',        reference: 'QTY823PL',    form: 'Form 3', stream: 'Science A' },
  { id: 6, studentName: 'Daniel Omondi',   admissionNumber: 'SHS/2021/0027', amount: 75000, date: '2024-09-01', method: 'Bank Transfer',  reference: 'BNK20240901B',form: 'Form 4', stream: 'Science A' },
  { id: 7, studentName: 'Cynthia Auma',    admissionNumber: 'SHS/2023/0012', amount: 40000, date: '2024-09-06', method: 'M-Pesa',        reference: 'MPX990ZA',    form: 'Form 2', stream: 'North A' },
  { id: 8, studentName: 'Brenda Muthoni',  admissionNumber: 'SHS/2022/0020', amount: 50000, date: '2024-09-07', method: 'Cash',          reference: 'CSH002',      form: 'Form 3', stream: 'Science A' },
  { id: 9, studentName: 'Brian Mwangi',    admissionNumber: 'SHS/2024/0005', amount: 65000, date: '2024-09-08', method: 'Bank Transfer',  reference: 'BNK20240908', form: 'Form 1', stream: 'East A' },
  { id: 10,studentName: 'Ann Wambui',      admissionNumber: 'SHS/2023/0016', amount: 68000, date: '2024-09-09', method: 'M-Pesa',        reference: 'MPX112ZB',    form: 'Form 2', stream: 'North B' },
];

const PAGE_SIZE = 8;
const fmt = (n) => `KSh ${Number(n).toLocaleString()}`;
const FORMS = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];

// ── Component ──────────────────────────────────────────────────────────────────
const FeeManagement = () => {
  const [currentView, setCurrentView]       = useState('overview');
  const [selectedForm, setSelectedForm]     = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery]       = useState('');
  const [currentPage, setCurrentPage]       = useState(1);
  const [historyPage, setHistoryPage]       = useState(1);
  const [showModal, setShowModal]           = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentForm, setPaymentForm]       = useState({
    admissionNumber: '', studentName: '', amount: '',
    method: 'M-Pesa', reference: '', date: new Date().toISOString().split('T')[0], notes: ''
  });

  // ── Helpers ──
  const streamsForForm = selectedForm !== 'all'
    ? [...new Set(ALL_STUDENTS.filter(s => s.form === selectedForm).map(s => s.stream))].sort()
    : [];

  const filtered = ALL_STUDENTS.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      (selectedForm   === 'all' || s.form   === selectedForm) &&
      (selectedStream === 'all' || s.stream === selectedStream) &&
      (selectedStatus === 'all' || s.status === selectedStatus) &&
      (!q || s.name.toLowerCase().includes(q) || s.admissionNumber.toLowerCase().includes(q))
    );
  });

  const totalPages     = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated      = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const histTotalPages = Math.max(1, Math.ceil(PAYMENT_HISTORY.length / PAGE_SIZE));
  const histPaginated  = PAYMENT_HISTORY.slice((historyPage - 1) * PAGE_SIZE, historyPage * PAGE_SIZE);

  const totalExpected  = ALL_STUDENTS.reduce((s, r) => s + r.total, 0);
  const totalCollected = ALL_STUDENTS.reduce((s, r) => s + r.paid, 0);
  const totalBalance   = ALL_STUDENTS.reduce((s, r) => s + r.balance, 0);
  const collectionRate = ((totalCollected / totalExpected) * 100).toFixed(1);

  const resetFilters = () => { setCurrentPage(1); };

  const statusColor = (status) => {
    if (status === 'paid')    return 'bg-green-100 text-green-700';
    if (status === 'partial') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const methodColor = (m) => {
    if (m === 'M-Pesa')        return 'bg-emerald-100 text-emerald-700';
    if (m === 'Bank Transfer') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  // ── Pagination ──
  const Pagination = ({ page, total, onChange }) => {
    const pages = Array.from({ length: total }, (_, i) => i + 1);
    return (
      <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 bg-slate-50">
        <p className="text-sm text-slate-600">
          Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{total}</span>
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
            className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft size={16} />
          </button>
          {pages.map(p => (
            <button key={p} onClick={() => onChange(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-emerald-500 text-white' : 'hover:bg-slate-200 text-slate-600'}`}>
              {p}
            </button>
          ))}
          <button onClick={() => onChange(Math.min(total, page + 1))} disabled={page === total}
            className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  // ── Record Payment Modal ──
  const RecordPaymentModal = () => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">Record Payment</h3>
          <button onClick={() => { setShowModal(false); setSelectedStudent(null); }}
            className="p-1 hover:bg-slate-100 rounded-lg">
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {/* Student info if pre-selected */}
          {selectedStudent ? (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm">
              <p className="font-semibold text-slate-800">{selectedStudent.name}</p>
              <p className="text-slate-500">{selectedStudent.admissionNumber} • {selectedStudent.form} — {selectedStudent.stream}</p>
              <p className="mt-1 text-slate-500">Balance: <span className="font-bold text-red-600">{fmt(selectedStudent.balance)}</span></p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Adm. Number *</label>
                <input type="text" placeholder="SHS/YYYY/XXXX" value={paymentForm.admissionNumber}
                  onChange={e => setPaymentForm({ ...paymentForm, admissionNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Student Name *</label>
                <input type="text" value={paymentForm.studentName}
                  onChange={e => setPaymentForm({ ...paymentForm, studentName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" />
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (KSh) *</label>
              <input type="number" placeholder="e.g. 20000" value={paymentForm.amount}
                onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Payment Date *</label>
              <input type="date" value={paymentForm.date}
                onChange={e => setPaymentForm({ ...paymentForm, date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method *</label>
              <select value={paymentForm.method}
                onChange={e => setPaymentForm({ ...paymentForm, method: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
                <option value="M-Pesa">M-Pesa</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reference / Receipt No</label>
              <input type="text" placeholder="e.g. QHJ892KL" value={paymentForm.reference}
                onChange={e => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
            <textarea rows={2} placeholder="Any additional notes..." value={paymentForm.notes}
              onChange={e => setPaymentForm({ ...paymentForm, notes: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm resize-none" />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button onClick={() => { setShowModal(false); setSelectedStudent(null); }}
            className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
            Cancel
          </button>
          <button onClick={() => { alert('Payment recorded successfully!'); setShowModal(false); setSelectedStudent(null); }}
            className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm">
            <Save size={16} /> Save Payment
          </button>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════════
  // OVERVIEW
  // ══════════════════════════════════════════════════════════════════════════════
  if (currentView === 'overview') {
    return (
      <div className="space-y-6">
        {showModal && <RecordPaymentModal />}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Fee Management</h1>
            <p className="text-slate-600 mt-1">Track student fee payments by form and stream</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download size={20} /><span className="font-medium">Export</span>
            </button>
            <button onClick={() => { setSelectedStudent(null); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              <Plus size={20} /><span className="font-medium">Record Payment</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Expected',   value: fmt(totalExpected),  icon: CreditCard,  color: 'bg-blue-100 text-blue-600' },
            { label: 'Collected',        value: fmt(totalCollected), icon: CheckCircle, color: 'bg-green-100 text-green-600' },
            { label: 'Outstanding',      value: fmt(totalBalance),   icon: AlertCircle, color: 'bg-red-100 text-red-600' },
            { label: 'Collection Rate',  value: `${collectionRate}%`,icon: TrendingUp,  color: 'bg-emerald-100 text-emerald-600' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Per-Form cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {FORMS.map(form => {
            const students  = ALL_STUDENTS.filter(s => s.form === form);
            const collected = students.reduce((s, r) => s + r.paid, 0);
            const expected  = students.reduce((s, r) => s + r.total, 0);
            const rate      = expected ? Math.round((collected / expected) * 100) : 0;
            const streamSet = [...new Set(students.map(s => s.stream))];
            return (
              <div key={form} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-800">{form}</h4>
                  <span className="text-xs text-slate-500 font-semibold">{streamSet.length} streams</span>
                </div>
                <div className="space-y-1 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Collected:</span>
                    <span className="font-semibold text-green-700">{fmt(collected)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Outstanding:</span>
                    <span className="font-semibold text-red-700">{fmt(expected - collected)}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                  <div className={`h-2 rounded-full ${rate >= 80 ? 'bg-green-500' : rate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${rate}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{rate}% collected</span>
                  <button
                    onClick={() => { setSelectedForm(form); setSelectedStream('all'); setCurrentPage(1); setCurrentView('payments'); }}
                    className="text-xs font-semibold text-emerald-600 hover:underline">
                    View →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Nav */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Student Payments', desc: 'View and manage individual student fee records filtered by form and stream.', icon: Users, color: 'bg-emerald-100 text-emerald-600', view: 'payments' },
            { title: 'Payment History',  desc: 'Browse all transactions with date, method, and reference details.', icon: Clock, color: 'bg-blue-100 text-blue-600', view: 'history' },
            { title: 'Fee Structure',    desc: 'View the annual fee breakdown by form level.', icon: DollarSign, color: 'bg-purple-100 text-purple-600', view: 'fee-structure' },
          ].map(nav => {
            const Icon = nav.icon;
            return (
              <button key={nav.title} onClick={() => setCurrentView(nav.view)}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 text-left hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${nav.color}`}>
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-slate-800">{nav.title}</h4>
                </div>
                <p className="text-sm text-slate-600">{nav.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // STUDENT PAYMENTS
  // ══════════════════════════════════════════════════════════════════════════════
  if (currentView === 'payments') {
    return (
      <div className="space-y-6">
        {showModal && <RecordPaymentModal />}

        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('overview')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">Student Payments</h1>
            <p className="text-slate-600 mt-1">
              {selectedForm !== 'all' ? selectedForm : 'All Forms'}
              {selectedStream !== 'all' ? ` — ${selectedStream}` : ''}
              {' '}• {filtered.length} student{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button onClick={() => { setSelectedStudent(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <Plus size={20} /><span className="font-medium">Record Payment</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-3 flex-wrap">
            <div className="flex-1 relative min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search by name or admission number..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={18} className="text-slate-500" />
              <select value={selectedForm}
                onChange={e => { setSelectedForm(e.target.value); setSelectedStream('all'); setCurrentPage(1); }}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
                <option value="all">All Forms</option>
                {FORMS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={selectedStream} disabled={selectedForm === 'all'}
                onChange={e => { setSelectedStream(e.target.value); setCurrentPage(1); }}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <option value="all">All Streams</option>
                {streamsForForm.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={selectedStatus}
                onChange={e => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active filter pills */}
        {(selectedForm !== 'all' || selectedStream !== 'all' || selectedStatus !== 'all') && (
          <div className="flex gap-2 flex-wrap">
            {selectedForm !== 'all' && (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                {selectedForm}
                <button onClick={() => { setSelectedForm('all'); setSelectedStream('all'); setCurrentPage(1); }}><X size={14} /></button>
              </span>
            )}
            {selectedStream !== 'all' && (
              <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {selectedStream}
                <button onClick={() => { setSelectedStream('all'); setCurrentPage(1); }}><X size={14} /></button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${statusColor(selectedStatus)}`}>
                {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                <button onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}><X size={14} /></button>
              </span>
            )}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Form & Stream</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {paginated.map(student => {
                  const pct = Math.round((student.paid / student.total) * 100);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold text-sm flex-shrink-0">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.admissionNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-semibold w-fit">{student.form}</span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold w-fit">{student.stream}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{fmt(student.total)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">{fmt(student.paid)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{fmt(student.balance)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-slate-600 font-medium">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(student.status)}`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setSelectedStudent(student); setShowModal(true); }}
                            className="px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                            + Pay
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-14 h-14 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No students match the current filters</p>
            </div>
          ) : (
            <Pagination page={currentPage} total={totalPages} onChange={setCurrentPage} />
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // PAYMENT HISTORY
  // ══════════════════════════════════════════════════════════════════════════════
  if (currentView === 'history') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('overview')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">Payment History</h1>
            <p className="text-slate-600 mt-1">All recorded fee transactions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download size={20} /><span className="font-medium">Export</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Form & Stream</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {histPaginated.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-slate-900">{p.studentName}</p>
                      <p className="text-xs text-slate-500">{p.admissionNumber}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-semibold w-fit">{p.form}</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold w-fit">{p.stream}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-700">{fmt(p.amount)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${methodColor(p.method)}`}>{p.method}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{p.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={historyPage} total={histTotalPages} onChange={setHistoryPage} />
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // FEE STRUCTURE
  // ══════════════════════════════════════════════════════════════════════════════
  if (currentView === 'fee-structure') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('overview')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Fee Structure</h1>
            <p className="text-slate-600 mt-1">Annual fee breakdown by form — Academic Year 2024</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Form</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tuition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Boarding</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Activity Levy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Development</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {FEE_STRUCTURE.map(fee => (
                  <tr key={fee.form} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">{fee.form}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{fmt(fee.tuition)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{fmt(fee.boarding)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{fmt(fee.activity)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{fmt(fee.development)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-emerald-700">{fmt(fee.total)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <strong>Note:</strong> Development levy increases each year as students progress to higher forms. All amounts are in Kenya Shillings (KSh) and cover the full academic year (3 terms).
        </div>
      </div>
    );
  }

  return null;
};

export default FeeManagement;