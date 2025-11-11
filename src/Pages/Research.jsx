import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBrain, FaChild, FaHandsHelping, FaSearch } from "react-icons/fa";
import counselingImg from "../assets/Hero.jpg";

const initialResearchHighlights = [
  {
    title: "Mental Health Assessment Improvement",
    description:
      "Developing better assessment tools to identify mental health issues early and accurately.",
    icon: <FaBrain className="text-teal-700 w-10 h-10" />,
  },
  {
    title: "Therapeutic Intervention Research",
    description:
      "Evaluating the effectiveness of various psychotherapy and counseling techniques.",
    icon: <FaHandsHelping className="text-teal-700 w-10 h-10" />,
  },
  {
    title: "Child Development Studies",
    description:
      "Researching strategies to support children’s cognitive, emotional, and social development.",
    icon: <FaChild className="text-teal-700 w-10 h-10" />,
  },
  {
    title: "Community Mental Health",
    description:
      "Studying ways to increase accessibility and awareness for mental health services.",
    icon: <FaSearch className="text-teal-700 w-10 h-10" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring", stiffness: 100 },
  }),
};

const Research = () => {
  const [researchHighlights, setResearchHighlights] = useState(initialResearchHighlights);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Research page loaded");
  }, []);

  const reloadResearch = () => {
    const shuffled = [...researchHighlights].sort(() => Math.random() - 0.5);
    setResearchHighlights(shuffled);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      {/* ---------- RESEARCH SECTION ---------- */}
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-teal-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Research at MindCare
        </motion.h2>

        <motion.p
          className="text-gray-700 text-lg mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          MindCare Bangladesh conducts ongoing research in mental health to improve assessment
          methods, therapies, and child development strategies. Our research supports
          evidence-based practices and better community care.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchHighlights.map((item, index) => (
            <motion.div
              key={index}
              className="bg-teal-50 rounded-xl shadow-lg p-6 text-left cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="flex items-center mb-4">
                <div className="bg-white p-3 rounded-full shadow-md mr-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-teal-800">{item.title}</h3>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button
            className="bg-yellow-400 text-teal-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition shadow-lg"
            onClick={() => alert("Coming soon: Full Research Details Page!")}
          >
            See Full Research Details
          </button>
          <button
            className="bg-teal-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-800 transition shadow-lg"
            onClick={reloadResearch}
          >
            Reload Highlights
          </button>
        </motion.div>
      </div>

      {/* ---------- COUNSELING SECTION ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-between py-16 px-8 md:px-20 bg-white mt-24">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-green-700 text-2xl font-semibold">
            Psychological Counseling
          </h2>
          <h3 className="text-gray-900 text-xl font-bold">
            Counseling for Everyone
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Looking for top-notch mental health services? <strong>LifeSpring</strong> is your
            one-stop solution. We offer both face-to-face and online counseling
            services, with a multidisciplinary team of 200+ experts, ready to
            support you with any mental health concern. Whether it’s a major or
            minor issue, our dedicated professionals ensure that everyone receives
            the utmost care and treatment wherever they are.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300 flex items-center gap-2">
            View Consultants <span className="text-lg">→</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={counselingImg}
            alt="Counseling session"
            className="rounded-2xl shadow-lg max-w-full md:max-w-md"
          />
        </div>
      </section>
    </div>
  );
};

export default Research;
