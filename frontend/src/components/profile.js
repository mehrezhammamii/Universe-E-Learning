import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import defaultProfilePic from './photo/blank-profile-picture-973460_1280.webp';
import './profile.css';

const Profile = () => {
  const { token, url } = useContext(StoreContext);
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${url}/api/student/get/${token}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStudentData(response.data.student);
          console.log('studentData is', response.data.student);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      }
    };


    fetchStudentData();
  }, [token, url]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-img" src={studentData.profilePic || defaultProfilePic} alt="Profile" />
        <h1>Profile</h1>
      </div>
      <div className="profile-body">
        <div className="profile-section">
          <h2>Courses Taken:</h2>
          {studentData.courses.map((course) => (
            <div key={course._id} className="profile-course">
              <h3>{course.courseName}</h3>
              <div className="quiz-scores">
                <span>Score: {studentData.score[course._id]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
