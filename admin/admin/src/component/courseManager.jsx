import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCourseForm from './addCourse';
import AddQuizForm from './addQuiz';
import './courseManager.css'; // Import the CSS file for styling

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
  };

  return (
    <div className="course-manager-container">
      <h2 className="course-manager-title">Course Manager</h2>
      <div className="course-manager-forms">
        <AddCourseForm fetchCourses={fetchCourses} />
        {selectedCourseId && (
          <AddQuizForm courseId={selectedCourseId} fetchCourses={fetchCourses} />
        )}
      </div>
      <div className="course-manager-list">
        {courses.map(course => (
          <div key={course._id} className="course-item">
            <h3>{course.courseName}</h3>
            <p>Category: {course.categorie}</p>
            <p>Description: {course.description}</p>
            <p>Price: {course.price}</p>
            {course.picture && <img src={course.picture} alt={course.courseName} className="course-picture" />}
            <div className="course-item-buttons">
              <button className="update" onClick={() => handleSelectCourse(course._id)}>Add Quiz</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManager;
