import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Find Consultants", to: "/team" },
    { name: "Training", to: "/training" },
    { name: "Research", to: "/research" },
  ];

  // Navbar animation variants
  const navVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="backdrop-blur-lg bg-teal-800/90 text-white shadow-md fixed top-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.img
                src={logo}
                alt="MindCare Logo"
                className="h-12 w-12 rounded-full object-cover shadow-lg"
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold hover:text-yellow-400 transition duration-300">
                  MindCare <span className="text-yellow-400">Bangladesh</span>
                </span>
                <motion.span
                  className="text-sm text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                >
                  A Trusted Mental Health Wellbeing Center
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.name}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={link.to}
                  className={`relative group transition ${
                    location.pathname === link.to
                      ? "text-yellow-400 font-semibold"
                      : ""
                  }`}
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}

            {/* Login/Register Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center space-x-4 ml-6"
            >
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-yellow-400/30"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-400 hover:text-teal-900 transition"
                >
                  Register
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-3xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-teal-700/95 backdrop-blur-md flex flex-col space-y-3 px-4 pb-6 pt-2 overflow-hidden border-t border-teal-600"
          >
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.name}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={link.to}
                  className={`block py-2 text-lg transition ${
                    location.pathname === link.to
                      ? "text-yellow-400 font-semibold"
                      : "hover:text-yellow-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Login/Register */}
            <div className="flex flex-col space-y-2 mt-4">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 px-4 py-2 rounded-full font-semibold shadow-lg"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-full font-semibold shadow-md"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
