import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// 🧠 Import your Hero background image
import heroImage from "../assets/Hero.jpg";

const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.mobile || !formData.password) return;

    MySwal.fire({
      title: "Login Successful!",
      text: "Welcome back to MindCare!",
      icon: "success",
      confirmButtonColor: "#14B8A6",
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🔹 Hero Background (same as Home) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      ></div>

      {/* 🔹 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-700/60 to-teal-500/50 backdrop-blur-sm"></div>

      {/* 🔹 Floating animation orbs (like motion lights) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{
          repeat: Infinity,
          duration: 8,
          repeatType: "reverse",
        }}
        className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl top-20 left-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{
          repeat: Infinity,
          duration: 9,
          repeatType: "reverse",
        }}
        className="absolute w-96 h-96 bg-teal-400/20 rounded-full blur-3xl bottom-20 right-16"
      />

      {/* 🔹 Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/40"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-teal-900 mb-8"
        >
          Welcome Back 👋
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter your mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <div
              className="absolute right-3 top-10 cursor-pointer text-gray-600 hover:text-teal-700 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>

            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-teal-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
          >
            Login
          </motion.button>
        </form>

        {/* Register Link */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-800 mt-6 text-center"
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Register here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
