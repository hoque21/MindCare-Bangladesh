import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  // Scroll to top on component mount
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

    console.log("Login Data:", formData);

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-700 via-teal-500 to-cyan-400 p-6">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 2 }}
          className="absolute w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl top-16 left-10"
        />
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 2 }}
          className="absolute w-80 h-80 bg-teal-300 rounded-full mix-blend-overlay filter blur-3xl bottom-16 right-10"
        />
      </div>

      {/* Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/30"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-teal-800 mb-8"
        >
          Welcome Back 👋
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mobile Number */}
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

          {/* Password Field */}
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
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-teal-800 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
          >
            Login
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-700 mt-6 text-center"
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-700 font-semibold hover:underline"
          >
            Register here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
