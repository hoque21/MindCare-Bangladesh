import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import heroImage from "../assets/Hero.jpg";

const MySwal = withReactContent(Swal);

/* ─────────────────────────────────────────────────────────────────────────
   IMPORTANT: Field and inputClass are defined OUTSIDE Registration.
   If they were inside, React would create a new component type on every
   render (every keystroke), causing inputs to unmount/remount and lose
   focus after each character typed.
───────────────────────────────────────────────────────────────────────── */

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-teal-800 mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

const inputClass = (fieldName, errors = {}) =>
  `w-full px-4 py-3 border-2 rounded-xl outline-none transition bg-white/80 text-teal-900 font-medium placeholder:text-gray-400 disabled:opacity-60 ${
    errors[fieldName]
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
  }`;

/* ─────────────────────────────────────────────────────────────────────────
   REGISTRATION COMPONENT
───────────────────────────────────────────────────────────────────────── */

const Registration = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    sex: "",
    age: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters.";

    if (!formData.mobile.trim())
      newErrors.mobile = "Mobile number is required.";
    else if (!/^\+?\d{7,20}$/.test(formData.mobile.replace(/[\s\-().]/g, "")))
      newErrors.mobile = "Enter a valid mobile number (e.g. 01712345678).";

    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      newErrors.email = "Enter a valid email address.";

    if (!formData.sex) newErrors.sex = "Please select your gender.";

    if (!formData.age) newErrors.age = "Age is required.";
    else if (Number(formData.age) < 5 || Number(formData.age) > 120)
      newErrors.age = "Age must be between 5 and 120.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    if (!error.response) {
      return "Cannot connect to the server. Please make sure the backend is running on port 5000.";
    }
    return (
      error.response?.data?.message || "Registration failed. Please try again."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(formData);

      await MySwal.fire({
        title: `Welcome, ${formData.name.trim()}! 🎉`,
        text: "Your account has been created. Please log in to continue.",
        icon: "success",
        iconColor: "#14B8A6",
        background: "#f0fdfa",
        confirmButtonColor: "#14B8A6",
        confirmButtonText: "Go to Login",
      });

      navigate("/login");
    } catch (error) {
      MySwal.fire({
        title: "Registration Failed",
        text: getErrorMessage(error),
        icon: "error",
        confirmButtonColor: "#14B8A6",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/75 via-teal-700/65 to-teal-500/55 backdrop-blur-sm" />

      {/* Decorative orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl top-20 left-10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-teal-400/20 rounded-full blur-3xl bottom-20 right-16 pointer-events-none"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/50 mx-4"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-700 rounded-full mb-4 shadow-lg">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-3xl font-extrabold text-teal-900">
            Create Your Account
          </h2>
          <p className="text-teal-600 text-sm mt-1">
            Join MindCare Bangladesh — it's free
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <Field label="Full Name" error={errors.name}>
            <input
              type="text"
              name="name"
              placeholder="e.g. Rafiul Hoque"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("name", errors)}
            />
          </Field>

          {/* Email */}
          <Field label="Email Address" error={errors.email}>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("email", errors)}
            />
          </Field>

          {/* Mobile */}
          <Field label="Mobile Number" error={errors.mobile}>
            <input
              type="tel"
              name="mobile"
              placeholder="e.g. 01712345678"
              value={formData.mobile}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("mobile", errors)}
            />
          </Field>

          {/* Gender & Age */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Gender" error={errors.sex}>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                disabled={loading}
                className={inputClass("sex", errors)}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </Field>

            <Field label="Age" error={errors.age}>
              <input
                type="number"
                name="age"
                placeholder="e.g. 25"
                min="5"
                max="120"
                value={formData.age}
                onChange={handleChange}
                disabled={loading}
                className={inputClass("age", errors)}
              />
            </Field>
          </div>

          {/* Password */}
          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className={inputClass("password", errors) + " pr-11"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-teal-700 transition"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </Field>

          {/* Confirm Password */}
          <Field label="Confirm Password" error={errors.confirmPassword}>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className={inputClass("confirmPassword", errors) + " pr-11"}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-teal-700 transition"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {formData.confirmPassword && formData.password && (
              <p
                className={`text-xs mt-1 font-medium ${
                  formData.password === formData.confirmPassword
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {formData.password === formData.confirmPassword
                  ? "✔ Passwords match"
                  : "✖ Passwords do not match"}
              </p>
            )}
          </Field>

          {/* Address */}
          <Field label="Address" error={errors.address}>
            <textarea
              name="address"
              placeholder="Your full address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              rows={2}
              className={inputClass("address", errors) + " resize-none"}
            />
          </Field>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-yellow-300/40 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-teal-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">
            Already have an account?
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login link */}
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-teal-700 text-teal-800 py-3 rounded-full font-bold text-base hover:bg-teal-50 transition"
          >
            Sign In Instead
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Registration;
