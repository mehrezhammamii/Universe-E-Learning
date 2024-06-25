import React from 'react';
import './navbar.css';
import logo from './photo/logo.jpg';

const Navbar = ({ handleNavigation }) => {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="Logo" className="logo" />
                <div className="nav-links">
                    <div className="nav-item" onClick={() => handleNavigation('course')}>Course</div>
                    <div className="nav-item" onClick={() => handleNavigation('about-us')}>About Us</div>
                    <div className="nav-item" onClick={() => handleNavigation('contact')}>Contact</div>
                </div>
                <div className="auth-links">
                    <div className="nav-item" onClick={() => handleNavigation('login')}>Login</div>
                    <div className="nav-item" onClick={() => handleNavigation('sign-up')}>Sign Up</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
