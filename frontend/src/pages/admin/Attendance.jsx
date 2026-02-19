import React ,{ useState } from 'react';
import {
    Search,Filter,Download,ArrowLeft, Save, Users,CheckCircle,XCircle,Clock,Calender,BookOpen,TrendingUp, Eye,ChevronDown
} from 'lucide-react';

const Attendance = () => {
    const [ currentView, setCurrentView] = useState('overview');
    const [ selectedForm, setSelectedForm] = useState ('');
    const [selectedStream, setSelectedStream] = useState ('');
    const [ selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [ searchQuery, setSearchQuery] = useState('');
    const [ filterForm, setFilterForm] = useState('all');

    //Classes available
    const classes = [
        {form: 'Form 1', streams: ['East A', 'East B', 'West A', 'West B'] },
        {form: 'Form 2', streams: ['North A', 'North B', 'South A', 'South B'] },
        {form: 'Form 3', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] },
        {form: 'Form 4', streams: ['Science A', 'Science B', 'Arts A', 'Arts B'] },
    ];

    //Mock stduents for attendance taking
    const [attendanceList, setAttendanceList] =useState([
        { id: 1, admissionNumber: 'SHS/2022/0456', name: 'Amani Odhiambo', status:'present', remarks: ''},
        { id: 2, admissionNumber: 'SHS/2022/0457', name: ' Grace wanjiru', status:'present', remarks: ''},
        { id: 3, admissionNumber: 'SHS/2022/0458', name: 'David Kamau', status:'absent', remarks: 'Sick'},
        { id: 4, admissionNumber: 'SHS/2022/0459', name: 'Faith Njeri', status:'present', remarks: ''},
        { id: 5, admissionNumber: 'SHS/2022/0460', name: 'Brian Mwangi', status:'late', remarks: 'Arrived 8:30 AM'},
        { id: 6, admissionNumber: 'SHS/2022/0461', name: 'Mercy Atieno', status:'present', remarks: ''},
        { id: 7, admissionNumber: 'SHS/2022/0462', name: 'Kevin Kipchoge', status:'absent', remarks: 'No reason given'},
        { id: 8, admissionNumber: 'SHS/2022/0463', name: 'Sharon Njoroge', status:'present', remarks: ''},
        { id: 9, admissionNumber: 'SHS/2022/0464', name: 'Isaac Mwenda', status:'present', remarks: ''},
        { id: 10, admissionNumber: 'SHS/2022/0465', name: 'Lydia Chebet', status:'late', remarks: 'Busy Delay'},

    ]);

    //Mock attendance history records
    const attendanceHistory = [
    { id: 1, form: 'Form 3', stream: 'Science A', date: '2024-11-20', present: 38, absent: 2, late: 1, total: 41, takenBy: 'Mr. James Kimani' },
    { id: 2, form: 'Form 2', stream: 'North A',   date: '2024-11-20', present: 39, absent: 1, late: 0, total: 40, takenBy: 'Mr. Peter Mutua' },
    { id: 3, form: 'Form 4', stream: 'Science A', date: '2024-11-20', present: 37, absent: 3, late: 0, total: 40, takenBy: 'Mrs. Grace Wanjiru' },
    { id: 4, form: 'Form 1', stream: 'East A',    date: '2024-11-19', present: 40, absent: 2, late: 1, total: 43, takenBy: 'Mrs. Grace Wanjiru' },
    { id: 5, form: 'Form 3', stream: 'Arts A',    date: '2024-11-19', present: 33, absent: 2, late: 0, total: 35, takenBy: 'Mr. Michael Mwangi' },
    { id: 6, form: 'Form 2', stream: 'North B',   date: '2024-11-19', present: 40, absent: 1, late: 0, total: 41, takenBy: 'Mrs. Mary Akinyi' },
    ];

    //Filtered history
    
}