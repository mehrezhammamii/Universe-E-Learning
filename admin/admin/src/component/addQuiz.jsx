import React, { useState } from 'react';
import axios from 'axios';
import './add.css'; // Import the CSS file for styling

const AddQuizForm = ({ courseId, fetchCourses }) => {
  const initialExerciseState = {
    Q9: [
      { answer: '', correct: false },
      { answer: '', correct: false },
      { answer: '', correct: false },
      { answer: '', correct: false }
    ]
  };

  const [exercise, setExercise] = useState(initialExerciseState);
  const [questionKey, setQuestionKey] = useState('Q9'); // State to manage the question key

  const handleAddQuiz = async () => {
    try {
      await axios.post(`http://localhost:5000/api/course/addExercise/${courseId}`, { exercise });
      console.log('Quiz added successfully');
      setExercise(initialExerciseState); // Reset the exercise form
      fetchCourses();
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  const handleExerciseChange = (e, index) => {
    const { name, value, checked } = e.target;
    const updatedExercise = { ...exercise };

    if (name.startsWith('answer')) {
      const keyToUpdate = Object.keys(updatedExercise[questionKey][index])[0]; // Get the current key
      updatedExercise[questionKey][index] = { [value]: updatedExercise[questionKey][index][keyToUpdate] }; // Update with new key
    } else if (name.startsWith('correct')) {
      updatedExercise[questionKey][index].correct = checked;
    }

    setExercise(updatedExercise);
  };

  // Function to handle changes in the question key input
  const handleQuestionKeyChange = (e) => {
    setQuestionKey(e.target.value);
  };

  // Function to update the exercise state with the new question key
  const handleUpdateQuestionKey = () => {
    setExercise({ [questionKey]: initialExerciseState.Q9 });
  };

  return (
    <div className="add-quiz-form">
      <h2>Add Quiz</h2>
      <div className="form-group">
        <label>Question Key:</label>
        <input
          type="text"
          value={questionKey} // Input field for the question key
          onChange={handleQuestionKeyChange}
          placeholder="Enter question key"
        />
        <button type="button" onClick={handleUpdateQuestionKey}>
          Update Question Key
        </button>
      </div>
      {exercise[questionKey]?.map((answer, index) => (
        <div key={`answer-${index}`} className="answer-label">
          Answer {index + 1}:
          <input
            type="text"
            name={`answer-${index}`}
            placeholder={`Answer ${index + 1}`}
            value={Object.keys(answer)[0]} // Display the current key
            onChange={(e) => handleExerciseChange(e, index)}
          />
          Correct?
          <input
            type="checkbox"
            name={`correct-${index}`}
            checked={answer.correct}
            onChange={(e) => handleExerciseChange(e, index)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddQuiz}>Add Quiz</button>
    </div>
  );
};

export default AddQuizForm;
