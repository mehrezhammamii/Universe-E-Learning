import React, { useContext } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { StoreContext } from '../context/StoreContext';

const Course = ({ handleNavigation }) => {
  const { courseList } = useContext(StoreContext);

  const handleCourseClick = (courseId) => {
    handleNavigation('oneCourse', courseId);
  };

  return (
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {courseList.map((el) => (
        <MDBCard key={el.id} style={{ maxWidth: '22rem', margin: '1rem' }}>
          <MDBCardImage
            src={el.picture}
            position='top'
            alt="image"
            onClick={() => handleCourseClick(el._id)}
          />
          <MDBCardBody>
            <MDBCardTitle onClick={() => handleCourseClick(el.id)}>{el.courseName}</MDBCardTitle>
            <MDBCardText>${el.price}</MDBCardText>
            <MDBBtn href='#'>Buy Now</MDBBtn>

          </MDBCardBody>
        </MDBCard>
      ))}
    </div>
  );
};

export default Course;
