import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import heroImage from "../assets/Hero.jpg";

const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = (error) => {
    if (!error.response) {
      return "Cannot connect to the server. Please make sure the backend is running on port 5000.";
    }
    return error.response?.data?.message || "Login failed. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobile = formData.mobile.trim();
    const password = formData.password;

    if (!mobile || !password) {
      MySwal.fire({
        title: "Missing Fields",
        text: "Please enter your mobile number and password.",
        icon: "warning",
        confirmButtonColor: "#14B8A6",
      });
      return;
    }

    setLoading(true);
    try {
      await login({ mobile, password });

      await MySwal.fire({
        title: "Login Successful! 🎉",
        text: "Welcome back! Redirecting to home...",
        icon: "success",
        iconColor: "#14B8A6",
        confirmButtonColor: "#14B8A6",
        timer: 1800,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      MySwal.fire({
        title: "Login Failed",
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/50 mx-4"
      >
        {/* Logo / heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-700 rounded-full mb-4 shadow-lg">
            <span className="text-2xl">🧠</span>
          </div>
          <h2 className="text-3xl font-extrabold text-teal-900">
            Welcome Back 👋
          </h2>
          <p className="text-teal-600 text-sm mt-1">
            Sign in to your MindCare account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-teal-800 mb-1.5">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="e.g. 01712345678"
              value={formData.mobile}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition bg-white/80 text-teal-900 font-medium placeholder:text-gray-400 disabled:opacity-60"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-teal-800 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 pr-11 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition bg-white/80 text-teal-900 font-medium placeholder:text-gray-400 disabled:opacity-60"
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
            <div className="text-right mt-1.5">
              <Link
                to="/forgot-password"
                className="text-xs text-teal-700 hover:text-teal-900 hover:underline font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-yellow-300/40 transition disabled:opacity-60 disabled:cursor-not-allowed"
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">
            New to MindCare?
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Register link */}
        <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-teal-700 text-teal-800 py-3 rounded-full font-bold text-base hover:bg-teal-50 transition"
          >
            Create an Account
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
