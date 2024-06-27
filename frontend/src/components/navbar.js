import React, { useContext, useState, useEffect } from 'react';
import './navbar.css';
import logo from './photo/logo.jpg';
import { StoreContext } from '../context/StoreContext';
import defaultProfilePic from './photo/blank-profile-picture-973460_1280.webp'; // Assuming this is the path to your default profile picture
import axios from 'axios';

const Navbar = ({ handleNavigation, setShowLogin }) => {
  const { token, setToken, url } = useContext(StoreContext);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (token) {
        try {
          const userResponse = await axios.get(`${url}/api/student/profile-pic`, { headers: { token } });
          if (userResponse.data.profilePic) {
            setProfilePic(userResponse.data.profilePic);
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    };
    fetchProfilePic();
  }, [token, url]);

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
