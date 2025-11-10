import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Components/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Team from "./Pages/OurTeam";
import Training from "./Pages/Training";
import Research from "./Pages/Research";
import Contact from "./Pages/Contact";

// Auth Pages
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import ForgetPassword from "./Components/ForgetPassword";
import ChatBot from "./Components/ChatBot";

function App() {
  return (
    <Router>
      <Navbar />
      {/* Offset for fixed navbar */}
      <div className="pt-16 min-h-screen">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/training" element={<Training />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
