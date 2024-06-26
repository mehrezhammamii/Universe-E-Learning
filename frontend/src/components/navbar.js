import React, { useContext, useState, useEffect } from 'react';
import './navbar.css';
import logo from './photo/logo.jpg';
import { StoreContext } from '../context/StoreContext.jsx'; // Ensure this import is correct
import axios from 'axios';

const Navbar = ({ handleNavigation, setShowLogin }) => {
  const { url } = useContext(StoreContext); // Use the url from StoreContext
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [profilePic, setProfilePic] = useState('');

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'your_cloudinary_upload_preset'); // Replace with your Cloudinary upload preset
  
    try {
      // Upload image to Cloudinary
      const response = await axios.post('https://api.cloudinary.com/v1_1/dfmtaoyxa/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer 453643294521992',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      const imageUrl = response.data.secure_url;
  
      // Update profile picture in your backend
      await axios.post(`${url}/api/student/update-profile-pic`, { imageUrl }, { headers: { Authorization: `Bearer ${token}` } });
  
      // Update the profile picture in the state
      setProfilePic(imageUrl);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again.');
    }
  };
  
  

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
          {token ? (
            <div className="logged-in-section">
              <img 
                className='profile-img' 
                src={profilePic} 
                alt="Profile" 
                onClick={() => setShowUploadForm(true)}
              />
              <button className='nav-item' onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="nav-item-btn" onClick={() => setShowLogin(true)}>LogIn</button>
          )}
        </div>
      </div>

      {showUploadForm && (
        <div className="upload-form">
          <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {profilePic && <img src={profilePic} alt="Profile" />}
          <button onClick={() => setShowUploadForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
