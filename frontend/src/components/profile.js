import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import defaultProfilePic from './photo/blank-profile-picture-973460_1280.webp';
import './profile.css';

const Profile = () => {
  const { token, url } = useContext(StoreContext);
  const [profileData, setProfileData] = useState({ profilePic: '', courses: [] });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${url}/api/student/profile`, { headers: { token } });
          setProfileData(response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };
    fetchProfileData();
  }, [token, url]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-img" src={profileData.profilePic || defaultProfilePic} alt="Profile" />
        <h1>Profile</h1>
      </div>
      <div className="profile-body">
        <div className="profile-section">
          <h2>Courses Taken:</h2>
          {profileData.courses.map((courseData) => (
            <div key={courseData.course._id} className="profile-course">
              <span>Course: {courseData.course.name}</span>
              <span>Score: {courseData.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
