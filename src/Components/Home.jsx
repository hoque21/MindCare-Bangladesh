import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CountUp from "react-countup";

// Assets
import testimonial1 from "../assets/Rifat.jpg";
import testimonial2 from "../assets/amir.jpg";
import chatLogo from "../assets/Logo.jpg";
import gallery1 from "../assets/service.jpg";
import gallery2 from "../assets/service.jpg";
import gallery3 from "../assets/service.jpg";

// FAQItem Component
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-lg p-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <h3 className="font-semibold text-teal-800">{question}</h3>
      {open && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  // States
  const [showModal, setShowModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    mobile: "",
    service: "",
    date: "",
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };
  const wellnessTips = [
  { icon: "🧘‍♂️", title: "Mindful Breathing", desc: "Take 5 minutes today to focus on your breath and relax your mind." },
  { icon: "🚶‍♀️", title: "Daily Walk", desc: "A short walk outside can boost mood and reduce stress." },
  { icon: "📖", title: "Read Something Uplifting", desc: "Spend 10 minutes reading a motivational or calming book." },
  { icon: "💧", title: "Hydrate", desc: "Drink enough water to keep your body and mind energized." },
  { icon: "📝", title: "Gratitude Journal", desc: "Write down 3 things you’re grateful for each day." },
];


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
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { text: chatInput, type: "user" }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: "Hello! How can I assist you today?", type: "bot" },
      ]);
    }, 500);
    setChatInput("");
  };
const quizQuestions = [
  {
    question: "How often do you feel stressed or anxious?",
    options: ["Rarely", "Sometimes", "Often", "Almost Always"],
  },
  {
    question: "Do you find it hard to focus on tasks?",
    options: ["Not at all", "Sometimes", "Often", "Always"],
  },
  {
    question: "How well do you sleep at night?",
    options: ["Very well", "Okay", "Poorly", "Very poorly"],
  },
];

const [currentQuestion, setCurrentQuestion] = useState(0);
const [showResult, setShowResult] = useState(false);
const [resultMessage, setResultMessage] = useState("");

const handleAnswer = (answer) => {
  if (currentQuestion < quizQuestions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    setShowResult(true);
    setResultMessage("Thank you for completing the quiz! For personalized support, consider booking an appointment.");
  }
};

  // Data
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

  const stats = [
    { label: "Happy Patients", value: 500, suffix: "+" },
    { label: "Experts", value: 20, suffix: "+" },
    { label: "Years of Service", value: 10, suffix: "+" },
  ];

  const faqs = [
    {
      question: "How can I book an appointment?",
      answer: "Click the 'Book Appointment' button and fill out the form. Our team will contact you shortly.",
    },
    {
      question: "Do you provide online consultations?",
      answer: "Yes, we provide online consultations for counseling, therapy, and psychiatric support.",
    },
    {
      question: "What are your working hours?",
      answer: "Monday to Saturday, from 9:00 AM to 6:00 PM.",
    },
    {
      question: "Do you provide child development services?",
      answer: "Yes! We have structured programs for child growth, learning, and emotional support.",
    },
    {
      question: "Are appointments covered by insurance?",
      answer: "Insurance coverage varies. Please contact our support team for details.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule by contacting us directly or through the appointment system.",
    },
  ];

  return (
    <div className="bg-white relative">
      {/* Hero Section */}
 <section
  className="relative w-full h-screen bg-cover bg-center bg-no-repeat text-white"
  
  style={{ backgroundImage: "src={chatLogo}" }}
>
  <div className="absolute inset-0 bg-gray-600 bg-opacity-60"></div>

  <motion.div
    className="relative max-w-7xl mx-auto px-8 py-32 flex flex-col md:flex-row items-center h-full"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 1 }}
  >
    <div className="md:w-1/2 mb-8 md:mb-0 z-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">MindCare Bangladesh</h1>
      <p className="text-lg md:text-xl mb-6">
        Trusted mental healthcare provider in Dhaka. Services include mental health assessment, counseling, psychotherapy, psychiatric consultation, training, and child development programs.
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

        {/* New Always Hovering Eye-Catching Button */}
        <motion.button
          onClick={() => navigate("/mindchange")} // Navigate to Mindchange.jsx route
          className="bg-pink-500 text-white font-bold px-6 py-3 rounded-full shadow-2xl absolute right-8 top-8"
          whileHover={{ scale: 1.2, rotate: 10, boxShadow: "0px 0px 20px rgba(255,0,150,0.8)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          MindCare MindChange
        </motion.button>
      </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className={`bg-gradient-to-r ${service.color} rounded-xl shadow-lg p-6 text-white cursor-pointer`}
                whileHover={{ scale: 1.07 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={handleShowMore}
            className="mt-8 bg-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Gallery
          </motion.h2>
          <div className="flex gap-4 overflow-x-auto">
            {[...galleryImages, ...galleryImages].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Gallery ${idx}`}
                className="w-80 h-60 rounded-xl shadow-lg cursor-pointer flex-shrink-0 object-cover"
                onClick={() => {
                  setSelectedImage(img);
                  setGalleryOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-teal-50">
  <div className="max-w-6xl mx-auto text-center">
    {/* Section Title with smooth fade and upward motion */}
    <motion.h2
      className="text-4xl font-bold text-teal-800 mb-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      What Our Clients Say
    </motion.h2>

    {/* Testimonials Grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
    >
      {testimonials.map((t, idx) => (
        <motion.div
          key={idx}
          className="bg-white rounded-xl shadow-2xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
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
    </motion.div>
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-2xl max-w-xl w-full shadow-xl">
            <button
              className="absolute top-2 right-5 text-gray-700 text-lg font-bold hover:text-gray-900"
              onClick={() => setGalleryOpen(false)}
            >
              ✖
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-auto mx-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}
      {/* Mental Health Tips Section */}
<section className="py-20 px-4 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      className="text-4xl font-bold text-teal-800 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      Daily Wellness Tips
    </motion.h2>

    <div className="flex overflow-x-auto gap-6 pb-4">
      {wellnessTips.map((tip, idx) => (
        <motion.div
          key={idx}
          className="min-w-[250px] bg-white rounded-xl shadow-lg p-6 flex flex-col items-start cursor-pointer hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
        >
          <div className="text-3xl mb-4">{tip.icon}</div>
          <h3 className="font-bold text-teal-800 mb-2">{tip.title}</h3>
          <p className="text-gray-700">{tip.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* Mental Health Self-Check Section */}
<section className="py-20 px-4 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
  <div className="max-w-4xl mx-auto text-center">
    <motion.h2
      className="text-4xl font-bold text-teal-800 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      Quick Mental Health Check
    </motion.h2>

    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-xl font-bold mb-4">{quizQuestions[currentQuestion].question}</h3>
      <div className="grid grid-cols-1 gap-4">
        {quizQuestions[currentQuestion].options.map((opt, idx) => (
          <button
            key={idx}
            className="bg-teal-100 text-teal-800 px-4 py-2 rounded-lg hover:bg-teal-200 transition"
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-600">
        Question {currentQuestion + 1} of {quizQuestions.length}
      </p>
    </div>

    {showResult && (
      <motion.div
        className="mt-6 bg-teal-100 p-6 rounded-xl shadow-lg text-teal-800 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {resultMessage}
        <div className="mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-800 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition"
          >
            Book an Appointment
          </button>
        </div>
      </motion.div>
    )}
  </div>
</section>


      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-teal-800 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Stats Section */}
      <section className="py-20 rounded-full px-4 bg-gray-600">
  <div className="max-w-6xl mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-8">
    {stats.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: idx * 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-5xl font-bold text-white">
          <CountUp
            start={0}
            end={item.value}
            duration={2.5}
            suffix={item.suffix}
            enableScrollSpy
            scrollSpyOnce
          />
        </h3>
        <p className="text-gray-300 mt-2">{item.label}</p>
      </motion.div>
    ))}
  </div>
</section>





      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
  <motion.div
    onClick={() => setChatOpen(!chatOpen)}
    className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg overflow-hidden"
    whileHover={{ scale: 1.2 }}       // Grow on hover
    animate={{ y: [0, -10, 0] }}      // Bounce animation
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    <img
      src={chatLogo}
      alt="AI Chatbot"
      className="w-full h-full object-cover"
    />
  </motion.div>
</div>

      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[400px] bg-white shadow-lg rounded-xl flex flex-col overflow-hidden z-50">
          <div className="bg-teal-800 text-white p-4">MCare Support</div>
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${msg.type === "user"
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
