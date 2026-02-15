import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, Users, Edit, Camera, Save, X, Home, Heart, GraduationCap, FileText, Activity, TrendingUp, Upload } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  // Editable student information
  const [editableInfo, setEditableInfo] = useState({
    firstName: 'Amani',
    lastName: 'Odhiambo',
    email: 'amani.odhiambo@student.school.ac.ke',
    phone: '+254 712 345 678',
    address: 'Nairobi, Kenya',
    county: 'Nairobi',
    subCounty: 'Westlands',
    clubs: ['Science Club', 'Debate Team', 'Drama Club'],
    sports: ['Basketball', 'Athletics'],
    leadership: ['Class Prefect'],
  });

  // Non-editable student information (read-only)
  const readOnlyInfo = {
    admissionNumber: 'SHS/2022/0456',
    nemisNumber: '12345678901',
    form: 'Form 3',
    stream: 'Science A',
    gender: 'Male',
    dateOfBirth: '2008-03-15',
    age: 16,
    admissionDate: '2022-01-15',
    currentTerm: 'Term 2, 2024',
    academicYear: '2024',
    
    // Guardian Information (non-editable)
    guardianName: 'Mr. Peter Odhiambo',
    guardianRelation: 'Father',
    guardianPhone: '+254 722 987 654',
    guardianEmail: 'p.odhiambo@email.com',
    guardianOccupation: 'Accountant',
    emergencyContact: 'Mrs. Grace Odhiambo',
    emergencyPhone: '+254 733 456 789',
    emergencyRelation: 'Mother',
    
    // Medical Information (non-editable)
    bloodGroup: 'O+',
    allergies: 'None',
    medicalConditions: 'None',
    
    // House Information (non-editable)
    house: 'Mamba House',
    houseColor: 'from-green-500 to-emerald-500',
    dormitory: 'Block A, Room 12',
    
    // Academic Performance Summary (non-editable)
    meanGrade: 'B+',
    meanScore: 73.5,
    classPosition: 5,
    streamPosition: 2,
    totalStudents: 45,
    conductRating: 'Excellent',
    attendanceRate: 96.5,
    disciplinaryRecords: 0
  };

  // Get initials from name
  const getInitials = () => {
    return `${editableInfo.firstName.charAt(0)}${editableInfo.lastName.charAt(0)}`.toUpperCase();
  };

  const handleInputChange = (field, value) => {
    setEditableInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setEditableInfo(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleArrayRemove = (field, index) => {
    setEditableInfo(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving changes:', editableInfo);
    console.log('Profile image:', profileImage);
    setIsEditing(false);
  };

  const stats = [
    {
      icon: Award,
      label: 'Mean Grade',
      value: readOnlyInfo.meanGrade,
      subtext: `${readOnlyInfo.meanScore} points`,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      label: 'Class Position',
      value: `${readOnlyInfo.classPosition}/${readOnlyInfo.totalStudents}`,
      subtext: 'Overall ranking',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Activity,
      label: 'Attendance',
      value: `${readOnlyInfo.attendanceRate}%`,
      subtext: 'This term',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Heart,
      label: 'Conduct',
      value: readOnlyInfo.conductRating,
      subtext: `${readOnlyInfo.disciplinaryRecords} incidents`,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Student Profile
              </h1>
              <p className="text-slate-600 text-lg">
                Academic Year {readOnlyInfo.academicYear} • {readOnlyInfo.currentTerm}
              </p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-slate-700">Cancel</span>
                  </button>
                  <button 
                    onClick={handleSave}
                    className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    <span className="font-medium">Save Changes</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Edit className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-slate-700">Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Card with Photo */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-8">
            {/* Profile Photo */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold text-white">
                    {getInitials()}
                  </span>
                )}
              </div>
              {isEditing && (
                <label className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <Camera className="w-8 h-8 text-white mb-2" />
                  <span className="text-white text-xs font-medium">Change Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden" 
                  />
                </label>
              )}
              <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br ${readOnlyInfo.houseColor} flex items-center justify-center shadow-lg`}>
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-800 mb-1">
                    {editableInfo.firstName} {editableInfo.lastName}
                  </h2>
                  <p className="text-slate-600 font-mono text-sm mb-2">
                    Admission No: {readOnlyInfo.admissionNumber}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold">
                      {readOnlyInfo.form} - {readOnlyInfo.stream}
                    </span>
                    <span className={`px-4 py-1 bg-gradient-to-br ${readOnlyInfo.houseColor} text-white rounded-full text-sm font-semibold`}>
                      {readOnlyInfo.house}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats (Non-editable) */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.subtext}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information (Names are editable here) */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
              {isEditing && <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Editable</span>}
            </div>
            
            <div className="space-y-4">
              {/* First Name - Editable */}
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">First Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="font-semibold text-slate-800 bg-white border-2 border-indigo-300 rounded-lg px-3 py-1 focus:outline-none focus:border-indigo-500"
                    placeholder="First Name"
                  />
                ) : (
                  <span className="font-semibold text-slate-800">{editableInfo.firstName}</span>
                )}
              </div>

              {/* Last Name - Editable */}
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Last Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="font-semibold text-slate-800 bg-white border-2 border-indigo-300 rounded-lg px-3 py-1 focus:outline-none focus:border-indigo-500"
                    placeholder="Last Name"
                  />
                ) : (
                  <span className="font-semibold text-slate-800">{editableInfo.lastName}</span>
                )}
              </div>

              {/* Read-only fields */}
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">NEMIS Number</span>
                <span className="font-semibold text-slate-800 font-mono">{readOnlyInfo.nemisNumber}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Gender</span>
                <span className="font-semibold text-slate-800">{readOnlyInfo.gender}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Date of Birth</span>
                <span className="font-semibold text-slate-800">{new Date(readOnlyInfo.dateOfBirth).toLocaleDateString()} ({readOnlyInfo.age} years)</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Blood Group</span>
                <span className="font-semibold text-slate-800">{readOnlyInfo.bloodGroup}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Admission Date</span>
                <span className="font-semibold text-slate-800">{new Date(readOnlyInfo.admissionDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Contact Information (Editable) */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Contact Information</h3>
              {isEditing && <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Editable</span>}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 py-3 border-b border-slate-200">
                <Mail className="w-5 h-5 text-indigo-500 mt-1" />
                <div className="flex-1">
                  <p className="text-slate-600 text-sm mb-1">Email Address</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editableInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full font-semibold text-slate-800 bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <p className="font-semibold text-slate-800 break-all">{editableInfo.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 py-3 border-b border-slate-200">
                <Phone className="w-5 h-5 text-purple-500 mt-1" />
                <div className="flex-1">
                  <p className="text-slate-600 text-sm mb-1">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editableInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full font-semibold text-slate-800 bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    <p className="font-semibold text-slate-800">{editableInfo.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 py-3 border-b border-slate-200">
                <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                <div className="flex-1">
                  <p className="text-slate-600 text-sm mb-1">Address</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editableInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full font-semibold text-slate-800 bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                        placeholder="Address"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editableInfo.subCounty}
                          onChange={(e) => handleInputChange('subCounty', e.target.value)}
                          className="flex-1 text-sm text-slate-600 bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="Sub-County"
                        />
                        <input
                          type="text"
                          value={editableInfo.county}
                          onChange={(e) => handleInputChange('county', e.target.value)}
                          className="flex-1 text-sm text-slate-600 bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                          placeholder="County"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-slate-800">{editableInfo.address}</p>
                      <p className="text-sm text-slate-600 mt-1">{editableInfo.subCounty}, {editableInfo.county} County</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 py-3 border-b border-slate-200">
                <Home className="w-5 h-5 text-emerald-500 mt-1" />
                <div className="flex-1">
                  <p className="text-slate-600 text-sm mb-1">Dormitory</p>
                  <p className="font-semibold text-slate-800">{readOnlyInfo.dormitory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guardian Information (Non-editable) */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Guardian Information</h3>
              <span className="ml-auto px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">Read Only</span>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-2">Primary Guardian</p>
                <p className="font-bold text-slate-800 mb-1">{readOnlyInfo.guardianName}</p>
                <p className="text-sm text-slate-600 mb-2">{readOnlyInfo.guardianRelation} • {readOnlyInfo.guardianOccupation}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    <span className="text-slate-700">{readOnlyInfo.guardianPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    <span className="text-slate-700">{readOnlyInfo.guardianEmail}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-2">Emergency Contact</p>
                <p className="font-bold text-slate-800 mb-1">{readOnlyInfo.emergencyContact}</p>
                <p className="text-sm text-slate-600 mb-2">{readOnlyInfo.emergencyRelation}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="text-slate-700">{readOnlyInfo.emergencyPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Activities (Editable) */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Activities & Involvement</h3>
              {isEditing && <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Editable</span>}
            </div>
            
            <div className="space-y-4">
              {/* Clubs */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Clubs & Societies
                </p>
                <div className="flex flex-wrap gap-2">
                  {editableInfo.clubs.map((club, index) => (
                    <div key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={club}
                            onChange={(e) => handleArrayChange('clubs', index, e.target.value)}
                            className="bg-transparent outline-none w-24"
                          />
                          <button onClick={() => handleArrayRemove('clubs', index)} className="hover:text-red-600 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <span>{club}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sports */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  Sports & Games
                </p>
                <div className="flex flex-wrap gap-2">
                  {editableInfo.sports.map((sport, index) => (
                    <div key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={sport}
                            onChange={(e) => handleArrayChange('sports', index, e.target.value)}
                            className="bg-transparent outline-none w-24"
                          />
                          <button onClick={() => handleArrayRemove('sports', index)} className="hover:text-red-600 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <span>{sport}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  Leadership Positions
                </p>
                <div className="flex flex-wrap gap-2">
                  {editableInfo.leadership.map((position, index) => (
                    <div key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={position}
                            onChange={(e) => handleArrayChange('leadership', index, e.target.value)}
                            className="bg-transparent outline-none w-24"
                          />
                          <button onClick={() => handleArrayRemove('leadership', index)} className="hover:text-red-600 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <span>{position}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information (Non-editable) */}
        <div className="mt-6 bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Medical Information</h3>
            <span className="ml-auto px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">Read Only</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">Blood Group</p>
              <p className="text-2xl font-bold text-slate-800">{readOnlyInfo.bloodGroup}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">Known Allergies</p>
              <p className="text-lg font-semibold text-slate-800">{readOnlyInfo.allergies}</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">Medical Conditions</p>
              <p className="text-lg font-semibold text-slate-800">{readOnlyInfo.medicalConditions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;