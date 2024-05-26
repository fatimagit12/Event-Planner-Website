import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import "./App.css";

const Home = ({ onLogout }) => {
  return (
    <>
      <Navbar onLogout={onLogout} />
      <HeroSection />
      <Services />
      <About />
      <Contact />
      <Footer />
      <Toaster />
    </>
  );
};

export default Home;
