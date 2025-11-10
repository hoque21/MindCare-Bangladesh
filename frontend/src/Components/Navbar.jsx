import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // to highlight active link

  const menuLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Find Consultants", to: "/team" },
    { name: "Training", to: "/training" },
    { name: "Research", to: "/research" },

  ];

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <nav className="bg-teal-800 text-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="MindCare Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold hover:text-yellow-400 transition-colors duration-300">
                MindCare <span className="text-yellow-400">Bangladesh</span>
              </span>
              <motion.span
                className="text-sm text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                A Trusted Mental Health Wellbeing Center
              </motion.span>

            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.to}
                className={`hover:text-yellow-400 transition ${location.pathname === link.to ? "text-yellow-400 font-semibold" : ""
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Login/Register */}
            <div className="flex items-center space-x-4 ml-6">
              <Link to="/login">
                <motion.button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 px-4 py-2 rounded-full font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-full font-semibold shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-teal-700 flex flex-col space-y-3 px-4 pb-4 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`hover:text-yellow-400 transition py-2 ${location.pathname === link.to ? "text-yellow-400 font-semibold" : ""
                }`}
              onClick={() => setIsOpen(false)} // close menu when clicked
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Login/Register */}
          <div className="flex flex-col space-y-2 mt-2">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-teal-900 px-4 py-2 rounded-full font-semibold shadow-lg">
                Login
              </button>
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-full font-semibold shadow-md">
                Register
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
