import React, { useContext, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { StoreContext } from '../context/StoreContext';
import './course.css'; // Import the CSS file for styling

const Course = ({ handleNavigation }) => {
  const { courseList, allCategory } = useContext(StoreContext);
  const [category, setCategory] = useState("all");

  const handleCourseClick = (courseId) => {
    handleNavigation('oneCourse', courseId);
  };

  return (
    <div className="course-container">
      <div className="filter-bar">
        <select className="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          {allCategory.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="course-grid">
        {courseList.map((el) => {
          if (category === "all" || el.categorie === category) {
            return (
              <MDBCard key={el._id} className="course-card">
                <MDBCardImage
                  src={el.picture}
                  position="top"
                  alt="image"
                  className="course-image"
                  onClick={() => handleCourseClick(el._id)}
                />
                <MDBCardBody>
                  <MDBCardTitle onClick={() => handleCourseClick(el._id)}>{el.courseName}</MDBCardTitle>
                  <MDBCardText>${el.price}</MDBCardText>
                  <MDBBtn onClick={() => handleCourseClick(el._id)}>Buy Now</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Course;
