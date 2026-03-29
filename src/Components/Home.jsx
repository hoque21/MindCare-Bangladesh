import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaStickyNote,
  FaCheckCircle,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useAuth } from "../contexts/AuthContext";
import { appointmentAPI } from "../services/api";

import heroImg from "../assets/service.jpg";
import team1 from "../assets/Rifat.jpg";
import team2 from "../assets/amir.jpg";
import team3 from "../assets/Sumon.jpg";
import team4 from "../assets/Siraj.jpg";

const MySwal = withReactContent(Swal);

/* ─── constants ───────────────────────────────────────────────────────────── */

const TIME_SLOTS = [
  { id: "09:00-10:00", label: "9:00 AM – 10:00 AM" },
  { id: "10:00-11:00", label: "10:00 AM – 11:00 AM" },
  { id: "11:00-12:00", label: "11:00 AM – 12:00 PM" },
  { id: "12:00-13:00", label: "12:00 PM – 1:00 PM" },
  { id: "13:00-14:00", label: "1:00 PM – 2:00 PM" },
  { id: "14:00-15:00", label: "2:00 PM – 3:00 PM" },
  { id: "15:00-16:00", label: "3:00 PM – 4:00 PM" },
  { id: "16:00-17:00", label: "4:00 PM – 5:00 PM" },
  { id: "17:00-18:00", label: "5:00 PM – 6:00 PM" },
];

const TEAM = [
  {
    name: "Dr. Rahman",
    role: "Psychiatrist",
    photo: team1,
    fee: 1000,
    experience: "12 Years Exp.",
    available: "Sat – Thu",
    tag: "Psychiatry",
  },
  {
    name: "Dr. Amir",
    role: "Psychologist",
    photo: team2,
    fee: 1000,
    experience: "9 Years Exp.",
    available: "Sat – Thu",
    tag: "Psychology",
  },
  {
    name: "Mr. Karim",
    role: "Therapist",
    photo: team3,
    fee: 1000,
    experience: "7 Years Exp.",
    available: "Sat – Thu",
    tag: "Therapy",
  },
  {
    name: "Ms. Farah",
    role: "Child Dev. Specialist",
    photo: team4,
    fee: 1000,
    experience: "10 Years Exp.",
    available: "Sat – Thu",
    tag: "Child Development",
  },
];

const VALUES = [
  {
    icon: <FaHeart className="text-4xl text-teal-600" />,
    title: "Compassion",
    desc: "Empathy, kindness, and understanding in every interaction with our clients.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-teal-600" />,
    title: "Integrity",
    desc: "Honest, transparent practices and the highest professional standards.",
  },
  {
    icon: <FaStar className="text-4xl text-teal-600" />,
    title: "Excellence",
    desc: "Continuous improvement in mental healthcare and professional education.",
  },
];

const STATS = [
  { num: "5,000+", label: "Patients Served" },
  { num: "4", label: "Expert Consultants" },
  { num: "7+", label: "Years of Service" },
  { num: "98%", label: "Satisfaction Rate" },
];

const WHY_POINTS = [
  "Licensed and experienced mental health professionals",
  "Confidential, stigma-free, judgment-free environment",
  "Flexible scheduling — book your 1-hour slot online",
  "Multidisciplinary team covering all mental health needs",
  "Specialised child & adolescent development programs",
  "Affordable consultation fees starting at ৳1,000",
];

const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "Scroll down to 'Meet Our Experts', log in, choose a doctor, pick a date and a free 1-hour slot, then confirm. You'll receive a booking ID instantly.",
  },
  {
    q: "What are your working hours?",
    a: "Our consultants are available Saturday through Thursday, 9:00 AM – 6:00 PM.",
  },
  {
    q: "Is online consultation available?",
    a: "Yes. We offer both in-person and online sessions for counselling, therapy, and psychiatric support.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes — log in, go to My Appointments, and cancel any upcoming session. Contact us directly to reschedule.",
  },
  {
    q: "Do you offer child development services?",
    a: "Absolutely. Ms. Farah leads our structured programs for child growth, learning, and emotional wellbeing.",
  },
  {
    q: "Is payment taken online?",
    a: "No — payment is collected at the clinic on the day of your visit.",
  },
];

/* ─── helpers ─────────────────────────────────────────────────────────────── */

const todayStr = () => new Date().toISOString().split("T")[0];

const formatDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ─── FAQ accordion ──────────────────────────────────────────────────────── */

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border border-teal-100 rounded-xl overflow-hidden shadow-sm"
      initial={false}
      animate={{ backgroundColor: open ? "#f0fdfa" : "#ffffff" }}
      transition={{ duration: 0.25 }}
    >
      <button
        className="w-full flex justify-between items-center px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-teal-900 text-sm md:text-base">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-teal-600 text-xl font-bold flex-shrink-0 ml-3"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   HOME COMPONENT
══════════════════════════════════════════════════════════════════════════════ */

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  /* modal state */
  const [showModal, setShowModal] = useState(false);
  const [doctor, setDoctor] = useState(null);

  /* booking form */
  const [apptDate, setApptDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ── modal helpers ────────────────────────────────────────────────────── */

  const resetForm = () => {
    setApptDate("");
    setSelectedSlot("");
    setNotes("");
    setBookedSlots([]);
    setLoadingSlots(false);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const openBooking = (member) => {
    if (!isAuthenticated) {
      MySwal.fire({
        title: "Login Required 🔒",
        html: `<p style="color:#374151">You need to be <b>logged in</b> to book an appointment with <b>${member.name}</b>.</p>`,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#14B8A6",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Maybe Later",
      }).then((r) => {
        if (r.isConfirmed) navigate("/login");
      });
      return;
    }
    resetForm();
    setDoctor(member);
    setShowModal(true);
  };

  /* ── fetch slots ──────────────────────────────────────────────────────── */

  const fetchSlots = useCallback(async (doctorName, date) => {
    if (!doctorName || !date) return;
    setLoadingSlots(true);
    setSelectedSlot("");
    setBookedSlots([]);
    try {
      const res = await appointmentAPI.getSlots(doctorName, date);
      setBookedSlots(res.data.bookedSlots || []);
    } catch (err) {
      MySwal.fire({
        title: "Could Not Load Slots",
        text:
          err?.response?.data?.message ||
          "Failed to fetch available slots. Please try again.",
        icon: "error",
        confirmButtonColor: "#14B8A6",
      });
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setApptDate(date);
    if (date && doctor) fetchSlots(doctor.name, date);
  };

  /* ── submit booking ───────────────────────────────────────────────────── */

  const handleBook = async () => {
    if (!apptDate || !selectedSlot || !doctor) return;
    setBooking(true);
    try {
      const res = await appointmentAPI.book({
        doctor_name: doctor.name,
        doctor_role: doctor.role,
        appointment_date: apptDate,
        time_slot: selectedSlot,
        notes: notes.trim() || null,
        fee: doctor.fee,
      });

      closeModal();

      MySwal.fire({
        title: "Appointment Confirmed! 🎉",
        html: `
          <div style="text-align:left;color:#065f46;line-height:2">
            <p>✅ <b>Doctor:</b> ${doctor.name}</p>
            <p>📅 <b>Date:</b> ${formatDate(apptDate)}</p>
            <p>🕐 <b>Slot:</b> ${TIME_SLOTS.find((s) => s.id === selectedSlot)?.label}</p>
            <p>💳 <b>Fee:</b> ৳${doctor.fee.toLocaleString()}</p>
            <p>🔖 <b>Booking ID:</b> #${res.data.appointmentId}</p>
          </div>`,
        icon: "success",
        iconColor: "#14B8A6",
        background: "#f0fdfa",
        confirmButtonColor: "#14B8A6",
        confirmButtonText: "View My Appointments",
        showCancelButton: true,
        cancelButtonText: "Stay on Home",
        cancelButtonColor: "#6b7280",
      }).then((r) => {
        if (r.isConfirmed) navigate("/my-appointments");
      });
    } catch (err) {
      MySwal.fire({
        title: "Booking Failed ❌",
        text:
          err?.response?.data?.message ||
          "Could not book the appointment. Please try again.",
        icon: "error",
        confirmButtonColor: "#14B8A6",
      });
    } finally {
      setBooking(false);
    }
  };

  const availableCount = TIME_SLOTS.length - bookedSlots.length;

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* background */}
        <motion.img
          src={heroImg}
          alt="MindCare Bangladesh"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/85 via-teal-800/70 to-teal-600/55" />

        {/* decorative orbs */}
        <motion.div
          className="absolute w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl -top-20 -left-20"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-teal-300/10 rounded-full blur-3xl -bottom-24 -right-24"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* hero content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Trusted Mental Healthcare · Since 2018
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-4 leading-tight">
              Welcome to <span className="text-yellow-400">MindCare</span>{" "}
              Bangladesh
            </h1>

            <p className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              A trusted centre of excellence for mental health assessment,
              counselling, psychotherapy, and child development — serving
              Bangladesh with compassion and care.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() =>
                  document
                    .getElementById("book-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 font-bold px-8 py-3.5 rounded-full shadow-xl hover:shadow-yellow-400/30 transition"
              >
                📅 Book an Appointment
              </motion.button>

              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition"
                >
                  Explore Our Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
          >
            <path
              fill="#f0fdfa"
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            />
          </svg>
        </div>
      </div>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <div className="bg-teal-800 text-white py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-4xl font-extrabold text-yellow-400">{s.num}</p>
              <p className="text-teal-200 text-sm mt-1 font-medium">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">
        {/* Mission & Vision */}
        <section>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-teal-800 text-center mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Mission &amp; Vision
          </motion.h2>
          <motion.p
            className="text-center text-teal-600 mb-10 max-w-lg mx-auto text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            The values and long-term goals that drive everything we do at
            MindCare Bangladesh.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                text: "Deliver compassionate, high-quality mental healthcare to empower individuals and families toward emotional and psychological well-being.",
                icon: "🎯",
              },
              {
                title: "Our Vision",
                text: "Be a leading mental healthcare provider in Bangladesh, known for excellence, innovation, and holistic support for mind and child development.",
                icon: "🌟",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-teal-600 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold text-teal-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-teal-800 text-center mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="text-center text-teal-600 mb-10 max-w-lg mx-auto text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            The principles we hold true in every patient interaction and every
            decision we make.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ rotate: 1 }}
              >
                <div className="bg-teal-50 rounded-full p-4 mb-4">{v.icon}</div>
                <h4 className="text-xl font-bold text-teal-800 mb-2">
                  {v.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-br from-teal-800 to-teal-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose MindCare Bangladesh?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_POINTS.map((point, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FaCheckCircle
                  className="text-yellow-400 mt-0.5 flex-shrink-0"
                  size={18}
                />
                <p className="text-teal-100 text-sm leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── MEET OUR EXPERTS + BOOK APPOINTMENT ────────────────────────── */}
        <section id="book-section">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-teal-800 mb-3">
              Meet Our Experts
            </h2>
            <p className="text-teal-600 max-w-xl mx-auto text-sm md:text-base">
              Our certified specialists are ready to support your mental health
              journey. Each session is <strong>1 hour</strong> and starts at{" "}
              <strong className="text-teal-800">৳1,000</strong>.
            </p>
          </motion.div>

          {/* guest banner */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-yellow-50 border border-yellow-300 rounded-2xl px-6 py-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-yellow-900 text-sm">
                    Login to Book an Appointment
                  </p>
                  <p className="text-yellow-700 text-xs mt-0.5">
                    Create a free account or sign in to schedule a 1-hour
                    session with any specialist.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-teal-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-teal-800 transition"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="border-2 border-teal-700 text-teal-800 text-sm font-semibold px-5 py-2 rounded-full hover:bg-teal-50 transition"
                  >
                    Register
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* logged-in welcome bar */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 bg-teal-50 border border-teal-200 rounded-2xl px-6 py-3"
            >
              <p className="text-teal-700 text-sm font-medium">
                👋 Hello, <strong>{user?.name}</strong>! Choose a specialist
                below to book your session.
              </p>
              <Link to="/my-appointments">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="text-teal-700 border border-teal-400 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-teal-100 transition"
                >
                  📋 My Appointments
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* team cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 120 }}
              >
                {/* photo */}
                <div className="relative h-52 overflow-hidden bg-teal-100">
                  <motion.img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute top-3 right-3 bg-yellow-400 text-teal-900 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md">
                    ৳{member.fee.toLocaleString()}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-teal-800/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {member.tag}
                  </div>
                </div>

                {/* info */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-lg font-extrabold text-teal-900">
                    {member.name}
                  </h4>
                  <p className="text-teal-600 font-semibold text-sm">
                    {member.role}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-gray-500 flex-1">
                    <p className="flex items-center gap-1.5">
                      <span>⏳</span>
                      {member.experience}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>📅</span>Available: {member.available}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>🕐</span>1-hour sessions
                    </p>
                  </div>

                  <motion.button
                    onClick={() => openBooking(member)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 py-2.5 rounded-full font-bold text-sm shadow hover:shadow-md transition flex items-center justify-center gap-2"
                  >
                    <FaCalendarAlt size={12} />
                    {isAuthenticated
                      ? "Book Appointment"
                      : "Book (Login First)"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-teal-800 text-center mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-center text-teal-600 mb-10 max-w-lg mx-auto text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Answers to the questions we hear most often.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact strip */}
        <section className="bg-white rounded-3xl shadow-lg border border-teal-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-teal-900 mb-1">
              Have a question?
            </h3>
            <p className="text-gray-600 text-sm">
              Reach our team anytime — we're here to help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a
              href="tel:+8801341630542"
              className="flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 font-semibold px-5 py-2.5 rounded-full hover:bg-teal-100 transition"
            >
              <FaPhoneAlt className="text-teal-600" size={13} />
              +880 1341-630542
            </a>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 font-bold px-5 py-2.5 rounded-full shadow hover:shadow-md transition"
              >
                <FaMapMarkerAlt size={13} />
                Contact Us
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
      {/* end max-w content */}

      {/* ══════════════════════════════════════════════════════════════════════
          APPOINTMENT MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showModal && doctor && (
          <motion.div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
              initial={{ scale: 0.85, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-6 rounded-t-2xl flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-yellow-400 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-extrabold leading-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-teal-200 text-sm">{doctor.role}</p>
                    <span className="mt-1.5 inline-block bg-yellow-400 text-teal-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      ৳{doctor.fee.toLocaleString()} / session
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white/70 hover:text-white transition mt-0.5 flex-shrink-0"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* body */}
              <div className="p-6 space-y-5">
                {/* patient info */}
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">
                    Your Details
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] text-gray-400 mb-0.5">
                        Full Name
                      </p>
                      <p className="font-semibold text-teal-900 text-sm">
                        {user?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 mb-0.5">Mobile</p>
                      <p className="font-semibold text-teal-900 text-sm">
                        {user?.mobile}
                      </p>
                    </div>
                  </div>
                </div>

                {/* date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-teal-800 mb-2">
                    <FaCalendarAlt className="text-teal-500" />
                    Select Appointment Date
                  </label>
                  <input
                    type="date"
                    min={todayStr()}
                    value={apptDate}
                    onChange={handleDateChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-teal-900 font-medium bg-white"
                  />
                </div>

                {/* slots */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-teal-800 mb-2">
                    <FaClock className="text-teal-500" />
                    Select Time Slot
                    <span className="text-xs font-normal text-gray-400 ml-1">
                      (1-hour session)
                    </span>
                    {apptDate && !loadingSlots && (
                      <span className="ml-auto text-xs font-semibold text-teal-600">
                        {availableCount}/{TIME_SLOTS.length} available
                      </span>
                    )}
                  </label>

                  {!apptDate ? (
                    <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
                      <span className="text-3xl mb-2">📅</span>
                      Pick a date above to see available slots
                    </div>
                  ) : loadingSlots ? (
                    <div className="flex items-center justify-center gap-3 py-8 text-teal-600">
                      <svg
                        className="animate-spin h-5 w-5"
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
                      <span className="font-medium">
                        Checking availability…
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const booked = bookedSlots.includes(slot.id);
                        const selected = selectedSlot === slot.id;
                        const [start, end] = slot.label.split(" – ");
                        return (
                          <button
                            key={slot.id}
                            disabled={booked}
                            onClick={() => !booked && setSelectedSlot(slot.id)}
                            className={`relative py-2 px-1 rounded-xl text-[11px] font-semibold text-center transition-all border-2 select-none
                              ${
                                booked
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : selected
                                    ? "bg-yellow-400 text-teal-900 border-yellow-400 shadow-md scale-105"
                                    : "bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-500 cursor-pointer"
                              }`}
                          >
                            <span className={booked ? "line-through" : ""}>
                              {start}
                            </span>
                            <br />
                            <span className="opacity-60 text-[10px]">
                              – {end}
                            </span>
                            {booked && (
                              <span className="block text-[9px] text-red-400 mt-0.5 font-bold">
                                Booked
                              </span>
                            )}
                            {selected && (
                              <span className="block text-[9px] text-teal-800 mt-0.5 font-bold">
                                ✓ Selected
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* notes */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-teal-800 mb-2">
                    <FaStickyNote className="text-teal-500" />
                    Notes
                    <span className="text-xs font-normal text-gray-400">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly describe your concern or reason for the visit…"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-sm resize-none bg-white"
                  />
                </div>

                {/* fee summary */}
                <div className="flex items-center justify-between bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl px-4 py-3 border border-teal-200">
                  <div className="flex items-center gap-2 text-sm text-teal-800 font-medium">
                    <FaMoneyBillWave className="text-teal-600" />
                    Session Fee:
                    <span className="font-extrabold text-teal-900 ml-1">
                      ৳{doctor.fee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <FaClock size={12} />
                    Duration: 1 Hour
                  </div>
                </div>

                {/* confirm button */}
                <motion.button
                  onClick={handleBook}
                  disabled={!apptDate || !selectedSlot || booking}
                  whileHover={{
                    scale: !apptDate || !selectedSlot || booking ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: !apptDate || !selectedSlot || booking ? 1 : 0.98,
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {booking ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
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
                      Booking Your Appointment…
                    </span>
                  ) : !apptDate ? (
                    "① Select a Date to Continue"
                  ) : !selectedSlot ? (
                    "② Select a Time Slot"
                  ) : (
                    "✓ Confirm Appointment"
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-400">
                  Payment is collected at the clinic on the day of your visit.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
