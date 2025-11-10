import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CountUp from "react-countup";
// Assets
import heroImage from "../assets/Hero.jpg";
import testimonial1 from "../assets/Rifat.jpg";
import testimonial2 from "../assets/amir.jpg";
import chatLogo from "../assets/Logo.jpg"; // AI Chatbot logo
import gallery1 from "../assets/Logo.jpg";
import gallery2 from "../assets/Logo.jpg";
import gallery3 from "../assets/Logo.jpg";

const Home = () => {
  const navigate = useNavigate();

  // Appointment state
  const [showModal, setShowModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    mobile: "",
    service: "",
    date: "",
  });

  // AI Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // Gallery modal
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Reload page once on first visit
  useEffect(() => {
    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  const handleShowMore = () => {
    navigate("/services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChatSend = () => {
    if (chatInput.trim() === "") return;
    setChatMessages((prev) => [...prev, { text: chatInput, type: "user" }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: "Hello! How can I assist you today?", type: "bot" },
      ]);
    }, 500);
    setChatInput("");
  };

  const services = [
    {
      title: "Counseling & Therapy",
      desc: "Individual and group counseling for mental health, stress, and emotional support.",
      color: "from-yellow-400 to-yellow-300",
    },
    {
      title: "Psychiatric Consultation",
      desc: "Expert psychiatric evaluation, diagnosis, and treatment plans.",
      color: "from-teal-400 to-teal-300",
    },
    {
      title: "Child Development Services",
      desc: "Support for child growth, learning, and development through structured programs.",
      color: "from-pink-400 to-pink-300",
    },
  ];

  const testimonials = [
    { name: "John Doe", feedback: "Amazing service and caring team!", img: testimonial1 },
    { name: "Jane Smith", feedback: "I felt really supported during my therapy.", img: testimonial2 },
  ];

  const galleryImages = [gallery1, gallery2, gallery3];

  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-800 to-teal-700 text-white">
        <motion.div
          className="max-w-7xl mx-auto px-8 py-32 flex flex-col md:flex-row items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-xl md:text-3xl font-bold mb-4">
              MindCare Bangladesh
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Trusted provider of mental healthcare services in Dhaka, Bangladesh. We offer mental health assessment, counseling, psychotherapy, psychiatric consultation, training, and child development services.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleShowMore}
                className="bg-yellow-400 text-teal-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:scale-105"
              >
                Explore Services
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-teal-900 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 transition transform hover:scale-105"
              >
                Book Appointment
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src={heroImage}
              alt="Mental health care"
              className="rounded-lg shadow-2xl"
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-teal-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-teal-800 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className={`bg-gradient-to-r ${service.color} rounded-xl shadow-lg p-6 text-white cursor-pointer`}
                whileHover={{ scale: 1.07 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8 },
                  },
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.button
            onClick={handleShowMore}
            className="mt-8 bg-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: services.length * 0.2 }}
          >
            Show More Services
          </motion.button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-teal-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Gallery
          </motion.h2>

          <motion.div
            className="flex gap-4"
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...galleryImages, ...galleryImages].map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`Gallery ${idx}`}
                className="w-80 h-60 rounded-xl shadow-lg cursor-pointer flex-shrink-0"
                onClick={() => {
                  setSelectedImage(img);
                  setGalleryOpen(true);
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-teal-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-teal-800 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-gray-700 mb-4">"{t.feedback}"</p>
                <div className="flex items-center justify-center">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span className="font-bold text-teal-800">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Stats Section with scroll-triggered CountUp */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Happy Patients", value: 500, suffix: "+" },
            { label: "Experts", value: 20, suffix: "+" },
            { label: "Years of Service", value: 10, suffix: "+" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-5xl font-bold text-teal-800">
                <CountUp
                  start={0}
                  end={item.value}
                  duration={2.5}
                  suffix={item.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <p className="text-gray-700 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-teal-800 mb-4 text-center">
              Book Appointment
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
              <select
                name="service"
                value={appointmentData.service}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Service</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
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
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {galleryOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30">
          <div className="relative bg-white p-4 rounded-6xl max-w-xl w-full shadow-xl">
            <button
              className="absolute top-2 right-5 text-gray-700 text-lg font-bold hover:text-gray-900"
              onClick={() => setGalleryOpen(false)}
            >
              ✖
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full max-w-sm max-h-32 mx-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition overflow-hidden"
        >
          <img
            src={chatLogo}
            alt="AI Chatbot"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[400px] bg-white shadow-lg rounded-xl flex flex-col overflow-hidden z-50">
          <div className="bg-teal-800 text-white p-4">MCare Support</div>
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${
                  msg.type === "user"
                    ? "bg-yellow-100 text-teal-900 self-end"
                    : "bg-teal-100 text-teal-800 self-start"
                } max-w-[80%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2 space-x-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-md px-2 py-1"
            />
            <button
              onClick={handleChatSend}
              className="bg-teal-800 text-white px-3 py-1 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
