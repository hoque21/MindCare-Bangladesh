import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// Hero background
import heroImage from "../assets/Hero.jpg";

const MySwal = withReactContent(Swal);

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    sex: "",
    age: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      MySwal.fire({
        title: "Error",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonColor: "#14B8A6",
      });
      return;
    }

    MySwal.fire({
      title: `Welcome, ${formData.name}!`,
      text: "Your registration was successful.",
      icon: "success",
      confirmButtonColor: "#14B8A6",
      confirmButtonText: "Go to Login",
      timer: 2500,
      timerProgressBar: true,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-700/60 to-teal-500/50 backdrop-blur-sm"></div>

      {/* Floating Motion Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{ repeat: Infinity, duration: 8, repeatType: "reverse" }}
        className="absolute w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl top-20 left-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{ repeat: Infinity, duration: 9, repeatType: "reverse" }}
        className="absolute w-96 h-96 bg-teal-400/20 rounded-full blur-3xl bottom-20 right-16"
      />

      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg bg-white/60 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/40"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-extrabold text-center text-teal-900 mb-8"
        >
          Create Your Account
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

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
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

          {/* Sex & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Sex
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
                placeholder="Your age"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>
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
              placeholder="Enter a strong password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <div
              className="absolute right-3 top-10 cursor-pointer text-gray-600 hover:text-teal-700 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <div
              className="absolute right-3 top-10 cursor-pointer text-gray-600 hover:text-teal-700 transition"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Your full address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
          >
            Register Now
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-800 mt-6 text-center"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 font-semibold hover:underline">
            Login here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Registration;
