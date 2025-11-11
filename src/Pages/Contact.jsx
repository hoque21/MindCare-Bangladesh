import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-teal-50 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-800 mb-6">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          <strong>Address:</strong> 123 Mental Health Rd, Dhaka, Bangladesh
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Email:</strong> info@mindcarebd.com
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Phone:</strong> +880 1234 567890
        </p>
        <p className="text-gray-700">
          For appointments, inquiries, or support, please reach out to us through email or phone.
        </p>
      </div>
    </div>
  );
};

export default Contact;
