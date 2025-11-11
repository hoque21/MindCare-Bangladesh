import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

// Example images
import training1 from "../assets/Rifat.jpg";
import training2 from "../assets/Rifat.jpg";
import training3 from "../assets/Rifat.jpg";
import training4 from "../assets/Rifat.jpg";

const Training = () => {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const trainings = [
    {
      title: "Mental Health First Aid",
      description: "Learn to recognize and respond to mental health crises effectively.",
      topics: [
        "Introduction to mental health",
        "Recognizing symptoms",
        "Emergency response",
        "Practical scenarios",
      ],
      image: training1,
      price: "5000 Taka",
      date: "2025-12-01",
    },
    {
      title: "Stress Management Workshops",
      description: "Techniques and strategies to reduce stress and improve mental wellbeing.",
      topics: [
        "Causes of stress",
        "Mindfulness techniques",
        "Breathing exercises",
        "Stress management plans",
      ],
      image: training2,
      price: "4000 Taka",
      date: "2025-12-15",
    },
    {
      title: "Child Development Training",
      description: "Support children’s growth and learning through evidence-based practices.",
      topics: [
        "Stages of child development",
        "Early learning strategies",
        "Behavioral guidance",
        "Parental involvement",
      ],
      image: training3,
      price: "6000 Taka",
      date: "2026-01-10",
    },
    {
      title: "Counseling Skills Training",
      description: "Develop professional counseling skills to support individuals and families.",
      topics: [
        "Active listening",
        "Communication skills",
        "Ethical considerations",
        "Role-playing exercises",
      ],
      image: training4,
      price: "4500 Taka",
      date: "2026-01-25",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, type: "spring", stiffness: 100 },
    }),
    hover: { scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" },
  };

  const showDetails = (training) => {
    Swal.fire({
      title: `<strong>${training.title}</strong>`,
      html: `
        <p><strong>Description:</strong> ${training.description}</p>
        <p><strong>Topics Covered:</strong></p>
        <ul style="text-align:left;margin-left:1em;">
          ${training.topics.map((topic) => `<li>${topic}</li>`).join("")}
        </ul>
        <p><strong>Price:</strong> ${training.price}</p>
        <p><strong>Upcoming Date:</strong> ${training.date}</p>
      `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Close",
      confirmButtonColor: "#14B8A6",
      background: "#f0fdfa", // light teal background
    });
  };

  return (
    <div className="min-h-screen bg-teal-50 px-4 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-teal-800 mb-12">Training Programs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainings.map((training, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2"
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
            >
              {/* Card Header Gradient */}
              <div className="w-full bg-gradient-to-r from-teal-400 to-teal-600 p-2 flex justify-center">
                <img
                  src={training.image}
                  alt={training.title}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white -mt-16 shadow-lg"
                  onClick={() => setSelectedImage(training.image)}
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-teal-800 mb-2">{training.title}</h3>
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">{training.description}</p>
                <div className="flex flex-col items-center mb-3">
                  <p className="text-gray-900 font-semibold">Price: {training.price}</p>
                  <p className="text-gray-600 text-sm">Date: {training.date}</p>
                </div>
                <button
                  onClick={() => showDetails(training)}
                  className="mt-auto px-4 py-2 bg-yellow-400 text-teal-900 font-semibold rounded-full hover:bg-yellow-300 transition shadow-lg"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-700 mt-12 text-lg max-w-3xl mx-auto">
          Our training programs are designed for professionals and caregivers who want to improve mental health support and skills. Click on any training card to see a larger image or view details.
        </p>
      </div>

      {/* Gallery Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-2xl max-w-3xl w-full shadow-xl">
            <button
              className="absolute top-2 right-2 text-gray-700 text-2xl font-bold hover:text-gray-900"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
            <img
              src={selectedImage}
              alt="Training"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;
