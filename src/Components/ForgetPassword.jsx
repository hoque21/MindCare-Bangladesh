import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import heroImage from "../assets/Hero.jpg";

const MySwal = withReactContent(Swal);

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await MySwal.fire({
      title: "OTP Sent! 📩",
      html: `<p style="color:#065f46">An OTP has been sent to <b>${emailOrMobile}</b></p>`,
      icon: "success",
      iconColor: "#14B8A6",
      background: "#f0fdfa",
      confirmButtonColor: "#14B8A6",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      timer: 2500,
      timerProgressBar: true,
    });
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) {
      await MySwal.fire({
        title: "Incomplete OTP ❗",
        html: `<p style="color:#b45309">Please enter all 4 digits of your OTP.</p>`,
        icon: "warning",
        iconColor: "#f59e0b",
        background: "#fef3c7",
        confirmButtonColor: "#f59e0b",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut",
        },
      });
      return;
    }
    await MySwal.fire({
      title: "OTP Verified ✅",
      html: `<p style="color:#065f46">Your OTP has been verified successfully!</p>`,
      icon: "success",
      iconColor: "#14B8A6",
      background: "#f0fdfa",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    setStep(3);
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      await MySwal.fire({
        title: "Passwords Do Not Match ⚠️",
        html: `<p style="color:#991b1b">Please re-enter your password correctly.</p>`,
        icon: "error",
        iconColor: "#ef4444",
        background: "#fee2e2",
        confirmButtonColor: "#ef4444",
        showClass: {
          popup: "animate__animated animate__headShake",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut",
        },
      });
      return;
    }
    await MySwal.fire({
      title: "Password Reset Successful 🎉",
      html: `<p style="color:#065f46">Your password has been updated successfully. Please login again.</p>`,
      icon: "success",
      iconColor: "#14B8A6",
      background: "#f0fdfa",
      confirmButtonText: "Go to Login",
      confirmButtonColor: "#14B8A6",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
    navigate("/login");
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
        className="absolute w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl top-20 left-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-teal-400/20 rounded-full blur-3xl bottom-20 right-16"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/40"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Email/Mobile */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-extrabold text-center text-teal-900 mb-4">
                Forgot Password 🔐
              </h2>
              <p className="text-gray-700 mb-6 text-center">
                Enter your registered <b>email</b> or <b>mobile number</b> to receive an OTP.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <input
                  type="text"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  required
                  placeholder="Enter your email or mobile"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
                >
                  Send OTP
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-extrabold text-center text-teal-900 mb-4">
                Verify OTP 🔢
              </h2>
              <p className="text-gray-700 mb-6 text-center">
                Enter the 4-digit OTP sent to your email or mobile.
              </p>
              <form className="flex justify-between space-x-3">
                {otp.map((digit, idx) => (
                  <motion.input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    whileFocus={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ))}
              </form>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleOtpSubmit}
                className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
              >
                Verify OTP
              </motion.button>
            </motion.div>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-extrabold text-center text-teal-900 mb-4">
                Reset Password 🔁
              </h2>
              <p className="text-gray-700 mb-6 text-center">
                Set your new secure password below.
              </p>
              <form onSubmit={handleNewPasswordSubmit} className="space-y-5">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                  <div
                    className="absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-teal-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </div>
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
                >
                  Reset Password
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
