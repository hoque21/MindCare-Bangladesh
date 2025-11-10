import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

// React Icons for sections
import { FaUserMd, FaBrain, FaHandsHelping, FaChild } from "react-icons/fa";

// Team images
import drRahman from "../assets/Rifat.jpg";
import drAmir from "../assets/amir.jpg";
import mrKarim from "../assets/Sumon.jpg";
import msFarah from "../assets/Siraj.jpg";

const OurTeam = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    mobile: "",
    service: "",
    date: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const teamMembers = [
    {
      name: "Dr. Rahman",
      role: "Psychiatrist",
      address: "MindCare Dhaka Clinic, 123 Health Rd, Dhaka",
      photo: drRahman,
      visit: 1000,
      section: "Psychiatry",
    },
    {
      name: "Dr. Amir",
      role: "Psychologist",
      address: "MindCare Dhaka Clinic, 123 Health Rd, Dhaka",
      photo: drAmir,
      visit: 1000,
      section: "Psychology",
    },
    {
      name: "Mr. Karim",
      role: "Therapist",
      address: "MindCare Dhaka Clinic, 123 Health Rd, Dhaka",
      photo: mrKarim,
      visit: 1000,
      section: "Therapy",
    },
    {
      name: "Ms. Farah",
      role: "Child Development Specialist",
      address: "MindCare Dhaka Clinic, 123 Health Rd, Dhaka",
      photo: msFarah,
      visit: 1000,
      section: "Child Development",
    },
  ];

  const sections = [
    { name: "Psychiatry", icon: <FaUserMd size={40} className="text-teal-700" /> },
    { name: "Psychology", icon: <FaBrain size={40} className="text-teal-700" /> },
    { name: "Therapy", icon: <FaHandsHelping size={40} className="text-teal-700" /> },
    { name: "Child Development", icon: <FaChild size={40} className="text-teal-700" /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Appointment Booked!",
      text: `Thank you, ${appointmentData.name}. Our team will contact you soon.`,
      icon: "success",
      confirmButtonColor: "#14B8A6",
    });
    setAppointmentData({ name: "", mobile: "", service: "", date: "" });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-teal-50 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-teal-800 mb-12 text-center">
          Our Team
        </h2>

        {/* Sections */}
        {!selectedSection && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-teal-100 to-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedSection(section.name)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
                whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
              >
                <div className="mb-3">{section.icon}</div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">{section.name}</h3>
                <p className="text-gray-700 text-center">Click to see experts in {section.name}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Expert Cards */}
        {selectedSection && (
          <div>
            <button
              className="mb-6 px-4 py-2 bg-teal-800 text-white rounded-full hover:bg-teal-700 transition"
              onClick={() => setSelectedSection("")}
            >
              ← Back to Sections
            </button>

            <h3 className="text-3xl font-semibold text-teal-700 mb-8 text-center">
              {selectedSection} Experts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers
                .filter((member) => member.section === selectedSection)
                .map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-center relative overflow-hidden cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0px 15px 25px rgba(0,0,0,0.3)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
                  >
                    <div className="overflow-hidden w-32 h-32 rounded-full mb-4">
                      <motion.img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-teal-800">{member.name}</h4>
                    <p className="text-gray-700">{member.role}</p>
                    <p className="text-gray-600 text-sm mt-1">{member.address}</p>
                    <p className="mt-4 text-teal-900 font-semibold">{member.visit} Taka</p>
                    <button
                      className="mt-4 px-5 py-2 bg-yellow-400 text-teal-900 rounded-full font-semibold hover:bg-yellow-300 transition"
                      onClick={() => {
                        setSelectedMember(member);
                        setAppointmentData((prev) => ({ ...prev, service: member.role }));
                        setShowModal(true);
                      }}
                    >
                      Book Appointment
                    </button>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-teal-800 mb-4 text-center">
              Book Appointment with {selectedMember.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={appointmentData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={appointmentData.mobile}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="service"
                value={appointmentData.service}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
              <input
                type="date"
                name="date"
                value={appointmentData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-teal-800 text-white py-2 rounded-full font-semibold hover:bg-teal-700 transition"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OurTeam;
