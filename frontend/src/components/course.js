import React, { useContext,useEffect,useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
const Course = ({handleNavigation}) => {
  const { courseList, allCategory } = useContext(StoreContext);
  const [category, setCategory] = useState("all"); 

  const handleCourseClick = (courseId) => {
    handleNavigation('oneCourse', courseId);
  };




  return (
    <div>
 
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        {allCategory.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {courseList.map((el) => {
          if (category === "all" || el.categorie === category) {
            return (
              <MDBCard key={el._id} style={{ maxWidth: '22rem', margin: '1rem' }}>
                <MDBCardImage
                  src={el.picture}
                  position='top'
                  alt="image"
                  onClick={() => handleCourseClick(el._id)}
                />
                <MDBCardBody>
                  <MDBCardTitle onClick={() => handleCourseClick(el._id)}>{el.courseName}</MDBCardTitle>
                  <MDBCardText>${el.price}</MDBCardText>
                  <MDBBtn href='#'>Buy Now</MDBBtn>
                </MDBCardBody>
                <button onClick={()=>handleNavigation("exercise",el._id)}>add exercise</button>
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
