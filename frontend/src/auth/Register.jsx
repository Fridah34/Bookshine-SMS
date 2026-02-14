import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, GraduationCap, Loader2, Eye, EyeOff, CheckCircle2, XCircle, Sparkles, ArrowRight, AlertCircle, ArrowLeft, Calendar, MapPin, Briefcase } from "lucide-react";

// ✅ STEP COMPONENTS MOVED OUTSIDE TO PREVENT RE-CREATION
const Step1 = ({ formData, handleChange, errors }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-5"
  >
    {/* Role Selection */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">I am a</label>
      <div className="relative">
        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer"
        >
          <option value="student">Student</option>
          <option value="parent">Parent/Guardian</option>
        </select>
      </div>
    </div>

    {/* Name Input */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          autoComplete="name"
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
        />
      </div>
    </div>

    {/* Email Input */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@school.com"
          autoComplete="email"
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
        />
      </div>
      {errors.email && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {errors.email[0]}
        </p>
      )}
    </div>
  </motion.div>
);

const Step2 = ({ formData, handleChange }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-5"
  >
    {/* Phone Input */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
      </label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+254712345678"
        autoComplete="tel"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
      />
    </div>

    {/* Student-specific fields */}
    {formData.role === "student" && (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </>
    )}

    {/* Parent-specific fields */}
    {formData.role === "parent" && (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Occupation <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <div className="relative">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Software Engineer"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
          />
        </div>
      </div>
    )}

    {/* Address */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Address <span className="text-gray-400 text-xs">(Optional)</span>
      </label>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St, Nairobi"
          autoComplete="street-address"
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
        />
      </div>
    </div>
  </motion.div>
);

const Step3 = ({ formData, handleChange, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, passwordStrength, passwordRequirements }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-5"
  >
    {/* Password Input */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="new-password"
          className="w-full pl-12 pr-14 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Password strength indicator */}
      {formData.password && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                className={`h-full ${passwordStrength.color} transition-all`}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{passwordStrength.label}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {passwordRequirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                {req.met ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                )}
                <span className={`text-xs ${req.met ? "text-green-600" : "text-gray-400"}`}>{req.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>

    {/* Confirm Password Input */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="new-password"
          className="w-full pl-12 pr-14 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-gray-50 focus:bg-white"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
          Passwords do not match
        </motion.p>
      )}
    </div>
  </motion.div>
);

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
    confirmPassword: "",
    phone: "",
    date_of_birth: "",
    gender: "male",
    address: "",
    occupation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { strength, label: "Medium", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const passwordRequirements = [
    { met: formData.password.length >= 6, text: "At least 6 characters" },
    { met: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
    { met: /[a-z]/.test(formData.password), text: "One lowercase letter" },
    { met: /\d/.test(formData.password), text: "One number" },
  ];

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          setError("Please enter your full name.");
          return false;
        }
        if (!formData.email.trim()) {
          setError("Please enter your email address.");
          return false;
        }
        if (!validateEmail(formData.email)) {
          setError("Please enter a valid email address.");
          return false;
        }
        return true;

      case 2:
        if (formData.role === "student" && !formData.date_of_birth) {
          setError("Please enter your date of birth.");
          return false;
        }
        return true;

      case 3:
        if (!formData.password) {
          setError("Please enter a password.");
          return false;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters.");
          return false;
        }
        if (!formData.confirmPassword) {
          setError("Please confirm your password.");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    setError("");
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setLoading(true);
    setError("");
    setErrors({});

    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      phone: formData.phone || null,
    };

    if (formData.role === "student") {
      registrationData.date_of_birth = formData.date_of_birth;
      registrationData.gender = formData.gender;
      registrationData.address = formData.address || null;
    } else if (formData.role === "parent") {
      registrationData.occupation = formData.occupation || null;
      registrationData.address = formData.address || null;
    }

    try {
      const result = await register(registrationData, formData.role);

      if (!result.success) {
        setError(result.message || "Registration failed. Please try again.");
        if (result.errors) {
          setErrors(result.errors);
          if (result.errors.email || result.errors.name) {
            setCurrentStep(1);
          }
        }
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step < currentStep
                  ? "bg-emerald-500 text-white"
                  : step === currentStep
                  ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {step < currentStep ? <CheckCircle2 size={20} /> : step}
            </div>
            {step < 3 && (
              <div
                className={`flex-1 h-1 mx-2 rounded transition-all ${
                  step < currentStep ? "bg-emerald-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span className={currentStep === 1 ? "text-emerald-600 font-semibold" : ""}>Basic Info</span>
        <span className={currentStep === 2 ? "text-emerald-600 font-semibold" : ""}>Details</span>
        <span className={currentStep === 3 ? "text-emerald-600 font-semibold" : ""}>Security</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -top-1/3 -left-1/4 w-64 h-64 md:w-96 md:h-96 bg-green-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [-90, 0, -90],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/4 -right-1/3 w-64 h-64 md:w-96 md:h-96 bg-blue-400 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col text-white space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold drop-shadow-lg">Bookshine</h1>
                <p className="text-white/90 text-sm font-medium">Student Management System</p>
              </div>
            </div>

            <h2 className="text-5xl font-bold leading-tight drop-shadow-lg">
              Join thousands of students and educators
            </h2>

            <p className="text-xl text-white/95 font-medium">
              Create your account to access powerful tools for managing your academic journey.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { icon: CheckCircle2, text: "Free account creation" },
                { icon: GraduationCap, text: "Track your academic progress" },
                { icon: Sparkles, text: "Access learning resources" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-base text-white/95 font-medium drop-shadow">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Register Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Bookshine</h1>
                  <p className="text-gray-500 text-xs">Student Management System</p>
                </div>
              </div>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create account</h2>
                <p className="text-gray-600">Fill in your details to get started</p>
              </div>

              {/* Progress Bar */}
              <ProgressBar />

              {/* Error Message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1 
                    key="step1" 
                    formData={formData} 
                    handleChange={handleChange} 
                    errors={errors} 
                  />
                )}
                {currentStep === 2 && (
                  <Step2 
                    key="step2" 
                    formData={formData} 
                    handleChange={handleChange} 
                  />
                )}
                {currentStep === 3 && (
                  <Step3 
                    key="step3" 
                    formData={formData} 
                    handleChange={handleChange}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    passwordStrength={passwordStrength}
                    passwordRequirements={passwordRequirements}
                  />
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-6 flex gap-3">
                {currentStep > 1 && (
                  <motion.button
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
                  >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                  </motion.button>
                )}

                {currentStep < totalSteps ? (
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight size={20} />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create account</span>
                        <CheckCircle2 size={20} />
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button onClick={navigateToLogin} className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">
                    Sign in
                  </button>
                </p>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-center text-white/90 text-sm mt-6 font-medium drop-shadow">© 2026 Bookshine. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;