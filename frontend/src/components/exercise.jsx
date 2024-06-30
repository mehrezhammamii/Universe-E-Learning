import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Exercise = ({selectedCourse}) => {
  const [questionText, setQuestionText] = useState('');
  const [choices, setChoices] = useState([
    { option: '', response: false },
    { option: '', response: false },
    { option: '', response: false },
    { option: '', response: false }
  ]);
  
  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index].option = value;
    setChoices(newChoices);
  };
const handleResponseChange = (index) => {
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      response: i === index
    }));
    setChoices(newChoices);
  };
  const validateForm = () => {
    if (questionText.trim() === '') {
      alert('Please enter the question text.');
      return false;
    }
    for (let choice of choices) {
      if (choice.option.trim() === '') {
        alert('Please enter all choices.');
        return false;
      }
    }
    if (!choices.some(choice => choice.response === true)) {
      alert('Please select the correct answer.');
      return false;
    }
   
    return true;
  };
  const addExercise = async () => {

    if (!validateForm()) {
        return;
      }
    let all = {};
    const question = {};
    question[questionText]= choices.map(choice => ({[choice.option]:choice.response}));  
    all["exercise"]=question;
   console.log("exercise is ",all);
   console.log("id is",selectedCourse);
    try {
      const res = await axios.post(`http://localhost:5000/api/course/addExercise/${selectedCourse}`, all);
     console.log("res",res);
     alert("added success");
    setChoices([
        { option: '', response: false },
        { option: '', response: false },
        { option: '', response: false },
        { option: '', response: false }
      ])
      setQuestionText("");
    } catch (error) {
      console.error("Error adding exercise:", error);
      alert("An error occurred while adding the exercise");
    }
  };
  return (
    <div>
      <h2>Add Exercise</h2>
      <div>
        <label>
          Question:
          <input 
            type="text" 
            value={questionText} 
            onChange={(e) => setQuestionText(e.target.value)} 
          />
        </label>
      </div>
      {choices.map((choice, index) => (
        <div key={index}>
          <label>
            Choice {index + 1}:
            <input 
              type="text" 
              value={choice.option} 
              onChange={(e) => handleChoiceChange(index, e.target.value)} 
            />
          </label>
          <label>
            <input 
              type="radio" 
              checked={choice.response} 
              onChange={() => handleResponseChange(index)} 
            />
            Correct Answer
          </label>
        </div>
      ))}
      <button onClick={addExercise}>Add Exercise</button>
    </div>
  );
};

export default Exercise;
