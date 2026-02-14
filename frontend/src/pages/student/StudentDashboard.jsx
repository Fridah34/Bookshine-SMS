const StudentDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">My Classes</h3>
          <p className="text-gray-600">View your enrolled classes</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">My Grades</h3>
          <p className="text-gray-600">Check your academic performance</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Attendance</h3>
          <p className="text-gray-600">View your attendance record</p>
        </div>
      </div>
    </div>
  );
};

export { StudentDashboard };