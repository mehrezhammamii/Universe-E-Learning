import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './quiz.css';

const QuizPage = ({ courseId, handleNavigation }) => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [score, setScore] = useState(0); 
  const [showScore, setShowScore] = useState(false); 
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

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    let totalCorrectAnswers = 0;

    quizData.quiz.forEach((quizItem, index) => {
      const questionIndex = index.toString();
      const correctAnswer = Object.entries(quizItem)[0][1].find(answer => answer[Object.keys(answer)[0]] === true);

      if (selectedAnswers[questionIndex] === Object.keys(correctAnswer)[0]) {
        totalCorrectAnswers++;
      }
    });

    const calculatedScore = (totalCorrectAnswers / quizData.quiz.length) * 100;
    setScore(calculatedScore);
    setShowScore(true); 

  };

  return (
    <div className="quiz-container">
      <h2>Quiz Page</h2>
      <button onClick={handleBackButtonClick}>Back to Course</button>
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
          {showScore && <div className="score-container">Your Score: {Math.round(score)}%</div>}
        </form>
      )}
    </div>
  );
};

export default QuizPage;
