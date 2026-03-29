import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FaUserMd,
  FaBrain,
  FaHandsHelping,
  FaChild,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaStickyNote,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { appointmentAPI } from "../services/api";

import drRahman from "../assets/Rifat.jpg";
import drAmir from "../assets/amir.jpg";
import mrKarim from "../assets/Sumon.jpg";
import msFarah from "../assets/Siraj.jpg";

const MySwal = withReactContent(Swal);

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

const teamMembers = [
  {
    name: "Dr. Rahman",
    role: "Psychiatrist",
    address: "MindCare Dhaka Clinic, Tejgaon, Dhaka",
    photo: drRahman,
    fee: 1000,
    section: "Psychiatry",
    experience: "12 Years Exp.",
    available: "Sat – Thu",
  },
  {
    name: "Dr. Amir",
    role: "Psychologist",
    address: "MindCare Dhaka Clinic, Tejgaon, Dhaka",
    photo: drAmir,
    fee: 1000,
    section: "Psychology",
    experience: "9 Years Exp.",
    available: "Sat – Thu",
  },
  {
    name: "Mr. Karim",
    role: "Therapist",
    address: "MindCare Dhaka Clinic, Tejgaon, Dhaka",
    photo: mrKarim,
    fee: 1000,
    section: "Therapy",
    experience: "7 Years Exp.",
    available: "Sat – Thu",
  },
  {
    name: "Ms. Farah",
    role: "Child Dev. Specialist",
    address: "MindCare Dhaka Clinic, Tejgaon, Dhaka",
    photo: msFarah,
    fee: 1000,
    section: "Child Development",
    experience: "10 Years Exp.",
    available: "Sat – Thu",
  },
];

const sections = [
  {
    name: "Psychiatry",
    icon: <FaUserMd size={40} className="text-teal-700" />,
    desc: "Expert psychiatric evaluation & medication management",
  },
  {
    name: "Psychology",
    icon: <FaBrain size={40} className="text-teal-700" />,
    desc: "Psychological assessment, diagnosis & therapy",
  },
  {
    name: "Therapy",
    icon: <FaHandsHelping size={40} className="text-teal-700" />,
    desc: "Individual, couples & group psychotherapy sessions",
  },
  {
    name: "Child Development",
    icon: <FaChild size={40} className="text-teal-700" />,
    desc: "Child behavioral support & developmental programs",
  },
];

const OurTeam = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Form state
  const [apptDate, setApptDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resetModal = () => {
    setApptDate("");
    setSelectedSlot("");
    setNotes("");
    setBookedSlots([]);
    setLoadingSlots(false);
  };

  const openModal = (member) => {
    if (!isAuthenticated) {
      MySwal.fire({
        title: "Login Required",
        html: "<p>You must be logged in to book an appointment.</p>",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#14B8A6",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((res) => {
        if (res.isConfirmed) navigate("/login");
      });
      return;
    }
    resetModal();
    setSelectedMember(member);
    setShowModal(true);
  };

  const fetchSlots = useCallback(async (doctor, date) => {
    if (!doctor || !date) return;
    setLoadingSlots(true);
    setSelectedSlot("");
    setBookedSlots([]);
    try {
      const res = await appointmentAPI.getSlots(doctor, date);
      setBookedSlots(res.data.bookedSlots || []);
    } catch (err) {
      MySwal.fire({
        title: "Error",
        text: "Failed to load available slots. Please try again.",
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
    if (date && selectedMember) fetchSlots(selectedMember.name, date);
  };

  const handleBook = async () => {
    if (!apptDate || !selectedSlot) return;
    setBooking(true);
    try {
      const res = await appointmentAPI.book({
        doctor_name: selectedMember.name,
        doctor_role: selectedMember.role,
        appointment_date: apptDate,
        time_slot: selectedSlot,
        notes: notes.trim() || null,
        fee: selectedMember.fee,
      });
      setShowModal(false);
      MySwal.fire({
        title: "Appointment Confirmed! 🎉",
        html: `<p style="color:#065f46">
          <b>Doctor:</b> ${selectedMember.name}<br/>
          <b>Date:</b> ${new Date(apptDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}<br/>
          <b>Slot:</b> ${TIME_SLOTS.find((s) => s.id === selectedSlot)?.label}<br/>
          <b>Booking ID:</b> #${res.data.appointmentId}
        </p>`,
        icon: "success",
        iconColor: "#14B8A6",
        background: "#f0fdfa",
        confirmButtonColor: "#14B8A6",
        confirmButtonText: "View My Appointments",
      }).then((r) => {
        if (r.isConfirmed) navigate("/my-appointments");
      });
    } catch (err) {
      MySwal.fire({
        title: "Booking Failed",
        text:
          err?.response?.data?.message ||
          "Could not book appointment. Please try again.",
        icon: "error",
        confirmButtonColor: "#14B8A6",
      });
    } finally {
      setBooking(false);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-teal-800 mb-3">
            Find Your Consultant
          </h2>
          <p className="text-teal-600 max-w-xl mx-auto">
            Choose a department, meet our specialists, and book a 1-hour session
            that works for you.
          </p>
        </motion.div>

        {/* Section Grid */}
        {!selectedSection && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.name}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center cursor-pointer border-2 border-transparent hover:border-teal-400 transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                }}
                onClick={() => setSelectedSection(section.name)}
              >
                <div className="bg-teal-50 rounded-full p-4 mb-4">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-teal-800 mb-2">
                  {section.name}
                </h3>
                <p className="text-gray-500 text-sm">{section.desc}</p>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="mt-4 text-teal-600 font-semibold text-sm flex items-center gap-1"
                >
                  View Specialists →
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Specialist Cards */}
        {selectedSection && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedSection("")}
                className="flex items-center gap-2 px-4 py-2 bg-teal-800 text-white rounded-full hover:bg-teal-700 transition text-sm font-semibold"
              >
                ← All Departments
              </button>
              <h3 className="text-2xl font-bold text-teal-700">
                {selectedSection} Specialists
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers
                .filter((m) => m.section === selectedSection)
                .map((member, i) => (
                  <motion.div
                    key={member.name}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100 flex flex-col"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* Photo */}
                    <div className="relative h-52 overflow-hidden bg-teal-100">
                      <motion.img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute top-3 right-3 bg-yellow-400 text-teal-900 text-xs font-bold px-2 py-1 rounded-full shadow">
                        ৳{member.fee.toLocaleString()}
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <h4 className="text-lg font-bold text-teal-900">
                        {member.name}
                      </h4>
                      <p className="text-teal-600 font-medium text-sm">
                        {member.role}
                      </p>
                      <div className="mt-2 space-y-1 text-xs text-gray-500 flex-1">
                        <p>🏥 {member.address}</p>
                        <p>⏳ {member.experience}</p>
                        <p>📅 {member.available}</p>
                      </div>
                      <motion.button
                        onClick={() => openModal(member)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 py-2.5 rounded-full font-bold text-sm shadow hover:shadow-md transition"
                      >
                        📅 Book Appointment
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      <AnimatePresence>
        {showModal && selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
                resetModal();
              }
            }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-6 rounded-t-2xl flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                    <p className="text-teal-200 text-sm">
                      {selectedMember.role}
                    </p>
                    <span className="mt-1 inline-block bg-yellow-400 text-teal-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      ৳{selectedMember.fee.toLocaleString()} / session
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetModal();
                  }}
                  className="text-white/70 hover:text-white ml-2 mt-1 transition"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Patient Info (read-only) */}
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-2">
                    Your Details
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-semibold text-teal-900 text-sm">
                        {user?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mobile</p>
                      <p className="font-semibold text-teal-900 text-sm">
                        {user?.mobile}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-teal-800 mb-2">
                    <FaCalendarAlt className="text-teal-600" /> Select Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={apptDate}
                    onChange={handleDateChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-teal-900 font-medium"
                  />
                </div>

                {/* Time Slot Grid */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-teal-800 mb-2">
                    <FaClock className="text-teal-600" /> Select Time Slot (1
                    Hour)
                    {apptDate && !loadingSlots && (
                      <span className="ml-auto text-xs text-gray-400 font-normal">
                        {TIME_SLOTS.length - bookedSlots.length} of{" "}
                        {TIME_SLOTS.length} available
                      </span>
                    )}
                  </label>

                  {!apptDate ? (
                    <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      📅 Please select a date first to see available slots
                    </div>
                  ) : loadingSlots ? (
                    <div className="flex items-center justify-center py-6 text-teal-600 gap-2">
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
                      Loading available slots...
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot.id);
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            disabled={isBooked}
                            onClick={() =>
                              !isBooked && setSelectedSlot(slot.id)
                            }
                            className={`py-2 px-1 rounded-lg text-xs font-semibold text-center transition border-2 ${
                              isBooked
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                                : isSelected
                                  ? "bg-yellow-400 text-teal-900 border-yellow-400 shadow-md scale-105"
                                  : "bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-400 cursor-pointer"
                            }`}
                          >
                            {slot.label.split(" – ")[0]}
                            <br />
                            <span className="text-[10px] font-normal opacity-70">
                              – {slot.label.split(" – ")[1]}
                            </span>
                            {isBooked && (
                              <div className="text-[9px] text-red-400 mt-0.5">
                                Booked
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-teal-800 mb-2">
                    <FaStickyNote className="text-teal-600" /> Notes{" "}
                    <span className="font-normal text-gray-400">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly describe your concern or reason for the visit..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-sm resize-none"
                  />
                </div>

                {/* Fee Summary */}
                <div className="flex items-center justify-between bg-teal-50 rounded-xl px-4 py-3 border border-teal-100 text-sm">
                  <div className="flex items-center gap-2 text-teal-700 font-medium">
                    <FaMoneyBillWave className="text-teal-600" />
                    Session Fee:{" "}
                    <span className="font-bold text-teal-900">
                      ৳{selectedMember.fee.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-500 flex items-center gap-1">
                    <FaClock size={12} /> 1 Hour
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  onClick={handleBook}
                  disabled={!apptDate || !selectedSlot || booking}
                  whileHover={{
                    scale: !apptDate || !selectedSlot || booking ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: !apptDate || !selectedSlot || booking ? 1 : 0.98,
                  }}
                  className="w-full py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-full font-bold text-base shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                      Booking...
                    </span>
                  ) : !apptDate ? (
                    "Select a Date"
                  ) : !selectedSlot ? (
                    "Select a Time Slot"
                  ) : (
                    "Confirm Appointment ✓"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurTeam;
