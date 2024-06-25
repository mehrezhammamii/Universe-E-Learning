/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './footer.css'; // Ensure this path is correct

const Footer = () => (
  <div className="footer">
    <div className="footer-container">
      <div className="footer-section">
        <h3>Universe e-learning</h3>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
          <a href="#">YouTube</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      © 2024 Universe. All rights reserved.
    </div>
  </div>
);

export default Footer;
