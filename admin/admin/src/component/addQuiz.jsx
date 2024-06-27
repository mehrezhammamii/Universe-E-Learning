import React, { useState } from 'react';
import axios from 'axios';
import './add.css'; // Import the CSS file for styling

const AddQuizForm = ({ courseId, fetchCourses }) => {
  const initialExerciseState = {
    question: '',
    Q9: [
      { A1: '', correct: false },
      { A2: '', correct: false },
      { A3: '', correct: false },
      { A4: '', correct: false }
    ]
  };

  const [exercise, setExercise] = useState(initialExerciseState);

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
    if (name === 'question') {
      updatedExercise.question = value;
    } else if (name.startsWith('A')) {
      updatedExercise.Q9[index][name] = value;
    } else if (name.startsWith('correct')) {
      updatedExercise.Q9[index].correct = checked;
    }
    setExercise(updatedExercise);
  };

  return (
    <div className="add-quiz-form">
      <h2>Add Quiz</h2>
      <div className="form-group">
        <label>Question</label>
        <input
          type="text"
          name="question"
          value={exercise.question}
          onChange={(e) => handleExerciseChange(e)}
          placeholder="Enter the question"
        />
      </div>
      {exercise.Q9.map((answer, index) => (
        <div key={`answer-${index}`} className="answer-label">
          Answer {index + 1}:
          <input
            type="text"
            name={`A${index + 1}`}
            placeholder={`Answer ${index + 1}`}
            value={answer[`A${index + 1}`]}
            onChange={(e) => handleExerciseChange(e, index)}
          />
          Correct?
          <input
            type="checkbox"
            name={`correct-${index + 1}`}
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
