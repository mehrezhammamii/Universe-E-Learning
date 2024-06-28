import React, { useContext, useState, useEffect } from 'react';
import './navbar.css';
import logo from './photo/logo.jpg';
import { StoreContext } from '../context/StoreContext';


const Navbar = ({ handleNavigation, setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
 


  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken("");
    console.log(localStorage.getItem('token'));
    alert('Logged out successfully!');
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="logo" onClick={() => handleNavigation('home')} />
        <div className="nav-links">
          <div className="nav-item" onClick={() => handleNavigation('course')}>Course</div>
          <div className="nav-item" onClick={() => handleNavigation('about-us')}>About Us</div>
          <div className="nav-item" onClick={() => handleNavigation('contact')}>Contact</div>
        </div>
        <div className="auth-links">
          {token ? (
            <div className="logged-in-section">
              <button className='nav-item' onClick={() => handleNavigation('profile')}>Profile</button>
              <button className='nav-item' onClick={handleLogout}>Logout</button>

            </div>
          ) : (
            <button className="nav-item-btn" onClick={() => setShowLogin(true)}>LogIn</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
