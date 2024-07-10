// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo" style={{ textAlign: 'center' }}>ONLINE AUCTION SYSTEM</div>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/contactus">Contact Us</Link>
      </div>
    </div>
  );
};
export default Navbar;