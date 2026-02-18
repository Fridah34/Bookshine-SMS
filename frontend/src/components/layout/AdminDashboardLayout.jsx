import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  User,
  UserCheck,
  DollarSign,
  ClipboardList,
  Award
} from 'lucide-react';

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState(5); // Mock notifications

  // Mock admin user - replace with actual auth
  const adminUser = {
    name: 'Admin User',
    email: 'admin@school.ac.ke',
    role: 'Administrator'
  };

  // Navigation menu items
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'students', name: 'Students', icon: Users, path: '/admin/students' },
    { id: 'teachers', name: 'Teachers', icon: GraduationCap, path: '/admin/teachers' },
    { id: 'classes', name: 'Classes', icon: BookOpen, path: '/admin/classes' },
    { id: 'academics', name: 'Academic Records', icon: Award, path: '/admin/academics' },
    { id: 'attendance', name: 'Attendance', icon: UserCheck, path: '/admin/attendance' },
    { id: 'fees', name: 'Fee Management', icon: DollarSign, path: '/admin/fees' },
    { id: 'timetable', name: 'Timetable', icon: Calendar, path: '/admin/timetable' },
    { id: 'library', name: 'Library', icon: FileText, path: '/admin/library' },
    { id: 'reports', name: 'Reports', icon: ClipboardList, path: '/admin/reports' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/admin/settings' }
  ];

  const handleLogout = async () => {
    // Implement logout logic
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div>
                <h1 className="text-xl font-bold">School SMS</h1>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            ) : (
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold">
                S
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-white border-r-4 border-emerald-300'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`
                }
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-6 border-t border-slate-700">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold">
                {adminUser.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{adminUser.name}</p>
                <p className="text-xs text-slate-400">{adminUser.role}</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold mx-auto">
              {adminUser.name.charAt(0)}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
              <p className="text-sm text-slate-600">Welcome back, {adminUser.name}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students, teachers..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell size={20} className="text-slate-600" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {adminUser.name.charAt(0)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-800">{adminUser.name}</p>
                    <p className="text-xs text-slate-500">{adminUser.role}</p>
                  </div>
                  <ChevronDown size={16} className="text-slate-500" />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800">{adminUser.name}</p>
                      <p className="text-xs text-slate-500">{adminUser.email}</p>
                    </div>
                    <button
                      onClick={() => navigate('/admin/profile')}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User size={16} />
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate('/admin/settings')}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;