import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <footer className="bg-gradient-to-r from-teal-800 to-teal-900 text-white mt-16 relative overflow-hidden">
      {/* Background floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-teal-500/10 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-teal-400/10 rounded-full blur-3xl bottom-0 right-0 animate-ping"></div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12 relative z-10"
      >
        {/* About Section */}
        <motion.div custom={0} variants={fadeUp} className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4 tracking-wide">MindCare Bangladesh</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Trusted mental healthcare provider in Dhaka. Services include mental health assessment,
            counseling, psychotherapy, psychiatric consultation, training, and child development programs.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            {[
              { icon: <FaFacebookF size={20} />, href: "https://www.facebook.com" },
              { icon: <FaInstagram size={20} />, href: "https://www.instagram.com" },
              { icon: <FaPhoneAlt size={20} />, href: "tel:+8801341630542" },
              { icon: <FaEnvelope size={20} />, href: "mailto:mindcarebangladesh25@gmail.com" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-yellow-400 transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div custom={1} variants={fadeUp} className="text-right md:text-right">
          <h2 className="text-xl font-bold mb-4 tracking-wide">Quick Links</h2>
          <ul className="space-y-3 text-gray-300">
            {[
              { label: "Mental Health Service", link: "#mental-health" },
              { label: "Child Development", link: "#child-development" },
              { label: "Educational Research Center", link: "#research-center" },
              { label: "Contact Us", link: "#contact" },
            ].map((item, i) => (
              <motion.li key={i} whileHover={{ x: -6 }} transition={{ type: "spring", stiffness: 200 }}>
                <a href={item.link} className="hover:text-yellow-400 transition">
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div custom={2} variants={fadeUp} className="text-right md:text-right">
          <h2 className="text-xl font-bold mb-4 tracking-wide">Contact Info</h2>
          <div className="space-y-2 text-gray-300">
            <p>113/B, Monipuripara, Gate-1, Tejgaon, Dhaka-1215</p>
            <p>+880 1341-630542</p>
            <p>+880 1538-059253</p>
            <p>
              <a href="mailto:mindcarebangladesh25@gmail.com" className="hover:text-yellow-400 transition">
                mindcarebangladesh25@gmail.com
              </a>
            </p>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div custom={3} variants={fadeUp} className="text-right md:text-right">
          <h2 className="text-xl font-bold mb-4 tracking-wide">Our Location</h2>
          <motion.iframe
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            title="MindCare Bangladesh Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.250987325581!2d90.39483331543135!3d23.774897584595386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a4e9d5b4b7%3A0x39ad0d2f2e8aa3b!2sMonipuripara%2C%20Tejgaon%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1699271932932!5m2!1sen!2sbd"
            width="100%"
            height="150"
            className="border-0 rounded-xl shadow-lg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></motion.iframe>
        </motion.div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="border-t border-teal-700 mt-12 py-4 text-center text-gray-300 text-sm relative z-10"
      >
        © {new Date().getFullYear()} MindCare Bangladesh. All rights reserved.
      </motion.div>
    </footer>
  );
}
