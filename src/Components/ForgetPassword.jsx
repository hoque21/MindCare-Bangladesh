import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import heroImage from "../assets/Hero.jpg";
import { authAPI } from "../services/api";

const MySwal = withReactContent(Swal);

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobile.trim()) {
      MySwal.fire({
        title: "Required",
        text: "Please enter your registered mobile number.",
        icon: "warning",
        confirmButtonColor: "#14B8A6",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.forgotPassword({ mobile });

      setSubmitted(true);

      MySwal.fire({
        title: "Request Sent! 📩",
        html: `<p style="color:#065f46">${
          response?.data?.message ||
          "If an account is associated with that number and has a registered email, a password reset link has been sent."
        }</p>`,
        icon: "success",
        iconColor: "#14B8A6",
        background: "#f0fdfa",
        confirmButtonColor: "#14B8A6",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

      MySwal.fire({
        title: "Error ❌",
        text: message,
        icon: "error",
        confirmButtonColor: "#14B8A6",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-700/60 to-teal-500/50 backdrop-blur-sm" />

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

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/40"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-teal-100 rounded-full p-4 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-teal-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-5 0-8 2.5-8 4v1h16v-1c0-1.5-3-4-8-4z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-teal-900 mb-2">
          Forgot Password 🔐
        </h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          Enter your registered <strong>mobile number</strong>. If we find a
          matching account with an email address, we'll send a password reset
          link to that email.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-teal-800 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                placeholder="e.g. +8801XXXXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white/70"
              />
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
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
                  Sending Reset Link...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4 space-y-3"
          >
            <div className="text-5xl">📬</div>
            <p className="text-teal-800 font-semibold text-lg">
              Check your email!
            </p>
            <p className="text-gray-600 text-sm">
              If a matching account was found, a reset link has been sent to the
              registered email address.
            </p>
          </motion.div>
        )}

        {/* Back to Login */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
