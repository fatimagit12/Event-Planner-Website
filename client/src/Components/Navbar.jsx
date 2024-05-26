import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed from props
    // Additional logout logic can be added here if needed
  };

  return (
    <nav>
      <div className="logo">KING's</div>
      <div className="navLinks">
        <div className="links">
          <ScrollLink to="hero" spy={true} smooth={true} duration={500}>
            HOME
          </ScrollLink>
          <ScrollLink to="services" spy={true} smooth={true} duration={500}>
            SERVICES
          </ScrollLink>
          <ScrollLink to="about" spy={true} smooth={true} duration={500}>
            ABOUT
          </ScrollLink>
          <ScrollLink to="contact" spy={true} smooth={true} duration={500}>
            CONTACT
          </ScrollLink>
          {onLogout && <button onClick={handleLogout}>Logout</button>}
          <Link to="/products">
            <button className="btn btn-info">View Products</button>
          </Link>
          <Link to="/products/add">
            <button className="btn btn-success">Add Product</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
