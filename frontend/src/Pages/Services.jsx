import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaBrain, FaUsers, FaStethoscope, FaChild, FaChalkboardTeacher } from "react-icons/fa";

const Services = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const services = [
    {
      title: "Mental Health Assessment",
      description:
        "Comprehensive evaluation of mental health for individuals and families.",
      icon: <FaBrain className="text-teal-700 w-16 h-16" />,
    },
    {
      title: "Counseling & Psychotherapy",
      description:
        "Individual, couple, and group therapy sessions to improve emotional wellbeing.",
      icon: <FaUsers className="text-teal-700 w-16 h-16" />,
    },
    {
      title: "Psychiatric Consultation",
      description:
        "Expert psychiatric evaluations and personalized treatment plans.",
      icon: <FaStethoscope className="text-teal-700 w-16 h-16" />,
    },
    {
      title: "Child Development Services",
      description: "Support for growth, learning, and development in children.",
      icon: <FaChild className="text-teal-700 w-16 h-16" />,
    },
    {
      title: "Professional Training Programs",
      description:
        "Workshops and training for mental health professionals and organizations.",
      icon: <FaChalkboardTeacher className="text-teal-700 w-16 h-16" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 },
    },
    hover: {
      scale: 1.06,
      boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 px-6 sm:px-8 lg:px-16 py-20">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-teal-800 mb-2 drop-shadow-sm">
          Our Services
        </h2>
        <p className="text-teal-700 text-sm md:text-base">
          Discover our range of professional services to improve mental health and wellbeing.
        </p>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-3xl shadow-lg cursor-pointer flex flex-col overflow-hidden"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
          >
            {/* Icon */}
            <div className="flex items-center justify-center h-48 bg-teal-100">
              {service.icon}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col items-start">
              <h3 className="text-xl font-bold text-teal-800 mb-2">{service.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{service.description}</p>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#FACC15" }}
                className="px-4 py-2 bg-yellow-400 text-teal-900 font-semibold rounded-full shadow-md transition-colors"
              >
                Learn More
              </motion.button>
            </div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-teal-100/40 to-transparent pointer-events-none rounded-3xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>

  );
};

export default Services;
