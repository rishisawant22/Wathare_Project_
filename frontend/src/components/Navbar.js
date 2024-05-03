import React from 'react';
import logo from '../components/image.png'; // Import your logo file
import '../css/Navbar.css'; // Import the CSS file from src/css directory

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-right">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
    </nav>
  );
};

export default Navbar;
