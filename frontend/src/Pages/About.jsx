import React, { useEffect } from "react";
import { motion } from "framer-motion";
import team1 from "../assets/Rifat.jpg";
import team2 from "../assets/amir.jpg";
import team3 from "../assets/sumon.jpg";
import team4 from "../assets/siraj.jpg";
import { FaHeart, FaShieldAlt, FaStar } from "react-icons/fa";

const About = () => {

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const teamMembers = [
    { name: "Dr. Rahman", role: "Psychiatrist", photo: team1 },
    { name: "Dr. Amir", role: "Psychologist", photo: team2 },
    { name: "Mr. Karim", role: "Therapist", photo: team3 },
    { name: "Ms. Farah", role: "Child Development Specialist", photo: team4 },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotate: -2 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { delay: i * 0.2, duration: 0.6, type: "spring", stiffness: 120 },
    }),
    hover: { scale: 1.08, rotate: 2, boxShadow: "0px 25px 35px rgba(0,0,0,0.25)" },
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50 px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-10 text-center tracking-tight drop-shadow-sm"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About MindCare Bangladesh
        </motion.h2>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-gradient-to-r from-teal-100 to-teal-50 rounded-3xl shadow-lg p-6 border-l-4 border-teal-600 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-teal-900 mb-2 drop-shadow-sm">Our Mission</h3>
            <p className="text-gray-700 text-base leading-snug">
              Deliver compassionate, high-quality mental healthcare to empower individuals and families toward emotional and psychological well-being.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-teal-100 to-teal-50 rounded-3xl shadow-lg p-6 border-l-4 border-teal-600 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-teal-900 mb-2 drop-shadow-sm">Our Vision</h3>
            <p className="text-gray-700 text-base leading-snug">
              Be a leading mental healthcare provider in Bangladesh, known for excellence, innovation, and holistic support for mind and child development.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-teal-800 mb-8 text-center tracking-tight drop-shadow-sm">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ icon: <FaHeart />, title: "Compassion", desc: "Empathy, kindness, and understanding in every interaction." },
              { icon: <FaShieldAlt />, title: "Integrity", desc: "Honest, transparent practices and the highest professional standards." },
              { icon: <FaStar />, title: "Excellence", desc: "Continuous improvement in mental healthcare and education." }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-500"
                initial={{ opacity: 0, y: 20, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: idx * 0.15 } }}
                whileHover={{ rotate: 2 }}
              >
                <div className="text-teal-600 text-4xl mb-3">{value.icon}</div>
                <h4 className="text-xl font-bold text-teal-800 mb-1 drop-shadow-sm">{value.title}</h4>
                <p className="text-gray-700 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-teal-800 mb-10 tracking-tight drop-shadow-sm">Meet Our Experts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center cursor-pointer transform transition-all duration-500"
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-3 border-4 border-teal-600 hover:scale-105 transition-transform duration-500">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-teal-900">{member.name}</h4>
                <p className="text-gray-700 text-sm mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
