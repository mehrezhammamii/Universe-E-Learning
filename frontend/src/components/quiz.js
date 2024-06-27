import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './quiz.css';
import { StoreContext } from '../context/StoreContext';

const QuizPage = ({ courseId, handleNavigation }) => {
  const {scoreStudent,setScoreStudent,addToScore,url,token}=useContext(StoreContext)
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [showScore,setShowScore] = useState(false); 
  const[resultScore,setResultScore]=useState(null);
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
const deleteScore= async()=>{
const response=await axios.post(url+"/api/score/remove",{courseId},{headers:{token}})
if(response.data.success){
console.log("deleted good ",response.data.data);
}
else{
  console.log("bad bro ");
}
}
  const handleQuizSubmit = async(event) => {
  
    event.preventDefault();
   await deleteScore();
let score=0;
   for (const [index, quizItem] of quizData.quiz.entries()) {
    const questionIndex = index.toString();
    const correctAnswer = Object.entries(quizItem)[0][1].find(answer => answer[Object.keys(answer)[0]] === true);

    console.log("correctedans", correctAnswer);
    console.log("selectans", selectedAnswers[questionIndex]);

    if (selectedAnswers[questionIndex] === Object.keys(correctAnswer)[0]) {
        console.log("courseId", courseId);
        

        await addToScore(courseId);
        score++;
    }
}
    console.log("scorestud",scoreStudent);
    const calculatedScore=score?(score*100)/quizData.quiz.length:0;
    console.log("calcuatedscore",calculatedScore);
    setResultScore(calculatedScore);
    setShowScore(true); 
  };

  return (
    <div className="quiz-container">
      <h2>Quiz Page</h2>
      <button onClick={handleBackButtonClick}>Back to Course</button>
      <button onClick={()=>addToScore(courseId)}>addscore</button>
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
