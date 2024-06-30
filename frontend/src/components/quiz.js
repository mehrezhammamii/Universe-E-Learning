import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './quiz.css';
import { StoreContext } from '../context/StoreContext';

<<<<<<< HEAD
const QuizPage = ({ courseId, handleNavigation }) => {
  const { scoreStudent, setScoreStudent, addToScore, url, token } = useContext(StoreContext);
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [showScore, setShowScore] = useState(false); 
  const [resultScore, setResultScore] = useState(null);

=======
  const QuizPage = ({ courseId, handleNavigation }) => {
  const {scoreStudent,setScoreStudent,addToScore,url,token}=useContext(StoreContext)
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [showScore,setShowScore] = useState(false);
  const[resultScore,setResultScore]=useState(null);
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
        setQuizData(response.data); 
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [courseId]);

  const handleBackButtonClick = () => {
    handleNavigation('oneCourse', courseId); 
  };

  const handleAnswerChange = (event, questionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: event.target.value, 
    });
  };

  const deleteScore = async () => {
    const response = await axios.post(`${url}/api/score/remove`, { courseId }, { headers: { token } });
    if (response.data.success) {
      console.log("Deleted successfully: ", response.data.data);
    } else {
      console.error("Deletion failed.");
    }
  };

  const handleQuizSubmit = async (event) => {
    event.preventDefault();
    await deleteScore();
    let score = 0;

<<<<<<< HEAD
    for (const [index, quizItem] of quizData.quiz.entries()) {
      const questionIndex = index.toString();
      const correctAnswer = Object.entries(quizItem)[0][1].find(answer => answer[Object.keys(answer)[0]] === true);
=======
    console.log("correctedans", correctAnswer);
    console.log("selectans", selectedAnswers[questionIndex]);

    if (selectedAnswers[questionIndex] === Object.keys(correctAnswer)[0]) {
        console.log("courseId", courseId);
      
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129

      if (selectedAnswers[questionIndex] === Object.keys(correctAnswer)[0]) {
        await addToScore(courseId);
        score++;
      }
    }

    const calculatedScore = score ? (score * 100) / quizData.quiz.length : 0;
    setResultScore(calculatedScore);
    setShowScore(true); 
    if(calculatedScore>=50){
      alert("you won this test ");
    }else{
      alert("sorry you fail u need stranger your knowledge and back again ")
    }
  };
  return (
    <div className="quiz-container">
      <h2>Quiz Page</h2>
      <button onClick={handleBackButtonClick}>Back to Course</button>
      <button onClick={() => addToScore(courseId)}>Add Score</button>
      {quizData && quizData.quiz && (
        <form onSubmit={handleQuizSubmit}>
          {quizData.quiz.map((quizItem, index) => (
            <div key={index} className="quiz-question">
              {Object.entries(quizItem).map(([question, answers], qIndex) => (
                <div key={qIndex}>
                  <h3>{question}</h3>
                  {answers.map((answerObj, aIndex) => (
                    <div key={aIndex} className="answer-option">
                      <input
                        type="radio"
                        id={`answer-${index}-${aIndex}`}
                        name={`question-${index}`} 
                        value={Object.keys(answerObj)[0]}
                        onChange={(event) => handleAnswerChange(event, index.toString())}
                        checked={selectedAnswers[index.toString()] === Object.keys(answerObj)[0]} 
                        disabled={showScore} 
                      />
                      <label htmlFor={`answer-${index}-${aIndex}`}>{Object.keys(answerObj)[0]}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          {!showScore && <button type="submit" className="submit-button">Submit Quiz</button>}
          {showScore && <div className="score-container">Your Score: {Math.round(resultScore)}%</div>}
        </form>
      )}
    </div>
  );
};

export default QuizPage;
