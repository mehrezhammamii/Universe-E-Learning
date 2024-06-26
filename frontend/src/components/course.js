import React, { useContext } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { StoreContext } from '../context/StoreContext';

const Course = () => {
  const {courseList}=useContext(StoreContext);
  return (
    <div>
    { courseList.map((el) => (
     
    <MDBCard style={{ maxWidth: '22rem', margin: '1rem' }}>
      <MDBCardImage src={el.picture} position='top' alt="image" />
      <MDBCardBody>
        <MDBCardTitle>{el.coursename}</MDBCardTitle>
        <MDBCardText>${el.price}</MDBCardText>
        <MDBBtn href='#'>Enroll Now</MDBBtn>
        <div><iframe width="560" height="315" src={el.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
      </MDBCardBody>
    </MDBCard>

     ))}
  </div>
  );
};

export default Course;
