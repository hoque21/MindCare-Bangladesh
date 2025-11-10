import React from "react";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-800 to-teal-900 text-white mt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">

        {/* About Section */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">MindCare Bangladesh</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Trusted mental healthcare provider in Dhaka. Services include mental health assessment, counseling, psychotherapy, psychiatric consultation, training, and child development programs.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition transform hover:scale-110">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition transform hover:scale-110">
              <FaInstagram size={20} />
            </a>
            <a href="tel:+8801341630542" className="hover:text-yellow-400 transition transform hover:scale-110">
              <FaPhoneAlt size={20} />
            </a>
            <a href="mailto:mindcarebangladesh25@gmail.com" className="hover:text-yellow-400 transition transform hover:scale-110">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-right md:text-right">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3 text-gray-300">
            <li><a href="#mental-health" className="hover:text-yellow-400 transition">Mental Health Service</a></li>
            <li><a href="#child-development" className="hover:text-yellow-400 transition">Child Development</a></li>
            <li><a href="#research-center" className="hover:text-yellow-400 transition">Educational Research Center</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-right md:text-right">
          <h2 className="text-xl font-bold mb-4">Contact Info</h2>
          <p className="text-gray-300">113/B, Monipuripara, Gate-1, Tejgaon, Dhaka-1215</p>
          <p className="text-gray-300 mt-2">+880 1341-630542</p>
          <p className="text-gray-300">+880 1538-059253</p>
          <p className="text-gray-300 mt-2">
            <a href="mailto:mindcarebangladesh25@gmail.com" className="hover:text-yellow-400 transition">
              mindcarebangladesh25@gmail.com
            </a>
          </p>
        </div>

        {/* Map */}
        <div className="text-right md:text-right">
          <h2 className="text-xl font-bold mb-4">Our Location</h2>
          <iframe
            title="MindCare Bangladesh Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.250987325581!2d90.39483331543135!3d23.774897584595386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a4e9d5b4b7%3A0x39ad0d2f2e8aa3b!2sMonipuripara%2C%20Tejgaon%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1699271932932!5m2!1sen!2sbd"
            width="100%"
            height="150"
            className="border-0 rounded-xl shadow-lg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-teal-700 mt-12 py-4 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} MindCare Bangladesh. All rights reserved.
      </div>
    </footer>
  );
}
