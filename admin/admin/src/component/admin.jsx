import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const Admin = ({ onSwitchToCourseManager }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updateCourseData, setUpdateCourseData] = useState({
    courseName: '',
    categorie: '',
    description: '',
    price: '',
    picture: ''
  });

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/course/${id}`);
      console.log('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdateCourse = (course) => {
    setSelectedCourse(course);
    setUpdateCourseData({
      courseName: course.courseName,
      categorie: course.categorie,
      description: course.description,
      price: course.price,
      picture: course.picture
    });
  };

  const handleSaveUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/course/${selectedCourse._id}`, updateCourseData);
      console.log('Course updated:', updateCourseData);
      setSelectedCourse(null);
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleCancelUpdate = () => {
    setSelectedCourse(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateCourseData({ ...updateCourseData, [name]: value });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="admin-container">
      <button className="go-to-course-manager" onClick={onSwitchToCourseManager}>Go to Course Manager</button>
      <h2>Admin Page</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course._id} className="course-item">
            <h3>{course.courseName}</h3>
            <p>Categorie: {course.categorie}</p>
            <p>Description: {course.description}</p>
            <p>Price: {course.price}</p>
            {course.picture && <img src={course.picture} alt={course.courseName} className="course-picture" />}
            <div className="course-item-buttons">
              <button className="delete" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
              <button className="update" onClick={() => handleUpdateCourse(course)}>Update</button>
            </div>
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCancelUpdate}>&times;</button>
            <h3>Update Course</h3>
            <form>
              <input type="text" name="courseName" placeholder="Course Name" value={updateCourseData.courseName} onChange={handleUpdateChange} />
              <input type="text" name="categorie" placeholder="Categorie" value={updateCourseData.categorie} onChange={handleUpdateChange} />
              <textarea name="description" placeholder="Description" value={updateCourseData.description} onChange={handleUpdateChange} />
              <input type="number" name="price" placeholder="Price" value={updateCourseData.price} onChange={handleUpdateChange} />
              <input type="text" name="picture" placeholder="Picture URL" value={updateCourseData.picture} onChange={handleUpdateChange} />
              <div className="course-item-buttons">
                <button type="button" className="save" onClick={handleSaveUpdate}>Save</button>
                <button type="button" className="cancel" onClick={handleCancelUpdate}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
