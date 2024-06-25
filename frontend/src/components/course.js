import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

const Course = ({ data }) => {
  return (
    <>
    { data.map((el) => (
     
    <MDBCard style={{ maxWidth: '22rem', margin: '1rem' }}>
      <MDBCardImage src={el.image} position='top' alt="image" />
      <MDBCardBody>
        <MDBCardTitle>{el.coursename}</MDBCardTitle>
        <MDBCardText>${el.price}</MDBCardText>
        <MDBBtn href='#'>Enroll Now</MDBBtn>
      </MDBCardBody>
    </MDBCard>

     ))}
  </>
  );
};

export default Course;
