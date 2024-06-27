import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { StoreContext } from '../context/StoreContext';

const Course = ({ handleNavigation }) => {
  const { courseList, token, url } = useContext(StoreContext);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleCourseClick = (courseId) => {
    handleNavigation('oneCourse', courseId);
  };

  const handleAnswerChange = (event, questionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: event.target.value,
    });
  };

  const handleQuizSubmit = async (courseId) => {
    try {
      console.log(`Submitting quiz for courseId: ${courseId}`);
      console.log('Selected answers:', selectedAnswers);

      const response = await axios.post(
        `${url}/api/submit-quiz`,
        {
          courseId,
          answers: selectedAnswers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Quiz submission response:', response.data);
      setQuizSubmitted(true);
      alert(`Your score is ${response.data.score}%`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {courseList.map((el) => (
        <MDBCard key={el._id} style={{ maxWidth: '22rem', margin: '1rem' }}>
          <MDBCardImage src={el.picture} position='top' alt="image" onClick={() => handleCourseClick(el._id)} />
          <MDBCardBody>
            <MDBCardTitle onClick={() => handleCourseClick(el._id)}>{el.courseName}</MDBCardTitle>
            <MDBCardText>${el.price}</MDBCardText>
            {!quizSubmitted && (
              <MDBBtn onClick={() => handleQuizSubmit(el._id)}>Submit Quiz</MDBBtn>
            )}
          </MDBCardBody>
        </MDBCard>
      ))}
    </div>
  );
};

export default Course;
