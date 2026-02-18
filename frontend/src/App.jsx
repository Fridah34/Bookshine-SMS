import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Auth
import { AuthProvider, useAuth } from "./hooks/useAuth.jsx";
import Login from "./auth/Login";
import Register from "./auth/Register";

// Layouts
import AuthLayout from "./components/layout/AuthLayout";
import {DashboardLayout} from "./components/layout/DashboardLayout";

// Pages
import  AdminDashboard from "./pages/admin/AdminDashboard";
import {TeacherDashboard} from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentDashboardLayout from "./components/layout/StudentDashboardLayout";
import Courses from "./pages/student/Courses";
import Assignments from "./pages/student/Assignments";
import Schedule from "./pages/student/Schedule";
import Grades from "./pages/student/Grades";
import StudentLibrary from "./pages/student/StudentLibrary";
import Profile from "./pages/student/Profile.jsx";
import AdminDashboardLayout from "./components/layout/AdminDashboardLayout";

//Admin
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";

/* -----------------------------
   INLINE PROTECTED ROUTE (RBAC)
------------------------------ */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Role-based restriction
  if (allowedRoles && !allowedRoles.some(role => user.roles?.some(r => r.name === role))) {
    const userRole = user.roles?.[0]?.name || 'student';
    return <Navigate to={`/${userRole}`} replace />;
  }

  return children;
};

/* -----------------------------
   SCROLL TO TOP ON ROUTE CHANGE
------------------------------ */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* -----------------------------
   MAIN APP
------------------------------ */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />

        <Routes>

          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboardLayout role="admin" />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<Students/>} />
            <Route path="/admin/teachers" element={<Teachers/>} />
          </Route>

          {/* TEACHER ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <DashboardLayout role="teacher" />
              </ProtectedRoute>
            }
          >
            <Route path="/teacher" element={<TeacherDashboard />} />
          </Route>

          {/* STUDENT ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboardLayout role="student" />
              </ProtectedRoute>
            }
          >
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/courses" element ={<Courses/>} />
            <Route path="/student/assignments" element={<Assignments/>} />
            <Route path="/student/schedule" element={<Schedule/>} />
            <Route path="/student/grades" element={<Grades/>} />
            <Route path="/student/library" element={<StudentLibrary/>} />
            <Route path="/student/profile" element={<Profile/>} />
          </Route>

          {/* FALLBACK */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-xl text-gray-600">Page Not Found</p>
                </div>
              </div>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
