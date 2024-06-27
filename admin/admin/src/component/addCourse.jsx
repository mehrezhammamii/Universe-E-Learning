import React, { useState } from 'react';
import axios from 'axios';
import './add.css'; // Import the CSS file for styling
import { CSSTransition } from 'react-transition-group'; // Import animation component

const AddCourseForm = ({ fetchCourses }) => {
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    category: '',
    description: '',
    price: '',
    picture: ''
  });

  const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/course', newCourse);
      console.log('Course added:', response.data.course);
      setNewCourse({
        courseName: '',
        category: '',
        description: '',
        price: '',
        picture: ''
      });
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  return (
    <CSSTransition in={true} appear={true} timeout={300} classNames="form-slide">
      <div className="form-container">
        <h2 className="form-header">Add Course</h2>
        <form className="add-form">
          <div className="form-group">
            <label>Course Name</label>
            <input type="text" name="courseName" value={newCourse.courseName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={newCourse.category} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={newCourse.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={newCourse.price} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Picture URL</label>
            <input type="text" name="picture" value={newCourse.picture} onChange={handleChange} />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleAddCourse}>Add Course</button>
          </div>
        </form>
      </div>
    </CSSTransition>
  );
};

export default AddCourseForm;
