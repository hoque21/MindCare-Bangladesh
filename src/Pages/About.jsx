import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaShieldAlt, FaStar } from "react-icons/fa";

import team1 from "../assets/Rifat.jpg";
import team2 from "../assets/amir.jpg";
import team3 from "../assets/Sumon.jpg";
import team4 from "../assets/Siraj.jpg";

const TEAM = [
  {
    name: "Dr. Rahman",
    role: "Psychiatrist",
    photo: team1,
    experience: "12 Years Exp.",
    tag: "Psychiatry",
  },
  {
    name: "Dr. Amir",
    role: "Psychologist",
    photo: team2,
    experience: "9 Years Exp.",
    tag: "Psychology",
  },
  {
    name: "Mr. Karim",
    role: "Therapist",
    photo: team3,
    experience: "7 Years Exp.",
    tag: "Therapy",
  },
  {
    name: "Ms. Farah",
    role: "Child Dev. Specialist",
    photo: team4,
    experience: "10 Years Exp.",
    tag: "Child Development",
  },
];

const VALUES = [
  {
    icon: <FaHeart className="text-4xl text-teal-600" />,
    title: "Compassion",
    desc: "Empathy, kindness, and deep understanding in every single interaction with our clients and their families.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-teal-600" />,
    title: "Integrity",
    desc: "Honest, transparent practices and unwavering commitment to the highest professional and ethical standards.",
  },
  {
    icon: <FaStar className="text-4xl text-teal-600" />,
    title: "Excellence",
    desc: "Continuous learning and improvement across every area of mental healthcare, training, and child development.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay },
});

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50 min-h-screen">
      {/* ── PAGE HEADER ───────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-700 text-white py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-sm">
            About <span className="text-yellow-400">MindCare</span> Bangladesh
          </h1>
          <p className="text-teal-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A trusted centre of excellence for mental health assessment,
            counselling, psychotherapy, and child development — serving
            Bangladesh with compassion since 2018.
          </p>
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Mission & Vision */}
        <section>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-teal-800 text-center mb-3"
            {...fadeUp()}
          >
            Our Mission &amp; Vision
          </motion.h2>
          <motion.p
            className="text-center text-teal-600 mb-10 max-w-lg mx-auto text-sm"
            {...fadeUp(0.1)}
          >
            The purpose and future that guide everything we do at MindCare
            Bangladesh.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                text: "To deliver compassionate, high-quality mental healthcare that empowers individuals, couples, and families toward lasting emotional and psychological well-being.",
              },
              {
                icon: "🌟",
                title: "Our Vision",
                text: "To be the leading mental healthcare provider in Bangladesh — recognised for excellence, innovation, and holistic support for both mind and child development.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-teal-600 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                {...fadeUp(i * 0.15)}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold text-teal-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-teal-100">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-teal-800 mb-4"
            {...fadeUp()}
          >
            Our Story
          </motion.h2>
          <motion.div
            className="space-y-4 text-gray-600 leading-relaxed"
            {...fadeUp(0.1)}
          >
            <p>
              MindCare Bangladesh was founded in 2018 with a simple yet powerful
              belief — that every person deserves access to quality, affordable,
              and stigma-free mental healthcare. Starting as a small counselling
              centre in Dhaka, we have grown into a multidisciplinary clinic
              serving thousands of clients across Bangladesh.
            </p>
            <p>
              Our team of licensed psychiatrists, psychologists, therapists, and
              child development specialists work together under one roof,
              ensuring each client receives comprehensive, coordinated care
              tailored to their unique needs.
            </p>
            <p>
              Today, MindCare Bangladesh stands as one of the most trusted names
              in mental health in the country — committed to the community, to
              continuous learning, and to the wellbeing of every individual who
              walks through our doors.
            </p>
          </motion.div>
        </section>

        {/* Core Values */}
        <section>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-teal-800 text-center mb-3"
            {...fadeUp()}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="text-center text-teal-600 mb-10 max-w-lg mx-auto text-sm"
            {...fadeUp(0.1)}
          >
            The principles we hold true in every patient interaction and every
            decision we make.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                {...fadeUp(i * 0.15)}
                whileHover={{ rotate: 1 }}
              >
                <div className="bg-teal-50 rounded-full p-4 mb-4">{v.icon}</div>
                <h4 className="text-xl font-bold text-teal-800 mb-2">
                  {v.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        <section>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-teal-800 text-center mb-3"
            {...fadeUp()}
          >
            Meet Our Experts
          </motion.h2>
          <motion.p
            className="text-center text-teal-600 mb-10 max-w-lg mx-auto text-sm"
            {...fadeUp(0.1)}
          >
            Our certified and experienced specialists who are dedicated to your
            mental health journey.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                {...fadeUp(i * 0.12)}
              >
                {/* Photo */}
                <div className="relative h-52 overflow-hidden bg-teal-100">
                  <motion.img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute bottom-3 left-3 bg-teal-800/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {member.tag}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-lg font-extrabold text-teal-900">
                    {member.name}
                  </h4>
                  <p className="text-teal-600 font-semibold text-sm">
                    {member.role}
                  </p>
                  <div className="mt-3 space-y-1 text-xs text-gray-500 flex-1">
                    <p className="flex items-center gap-1.5">
                      <span>⏳</span> {member.experience}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>📅</span> Available: Sat – Thu
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>🏥</span> Tejgaon, Dhaka
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
