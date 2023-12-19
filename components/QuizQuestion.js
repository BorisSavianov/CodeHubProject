import React, { useState } from "react";
import styles from "@/styles/Quiz.module.css";
import ToastComponent from "./Toast";

const QuizQuestion = ({ question, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    onAnswer(selectedOption);
  };

  return (
    <div className={styles.quizQuestion}>
      <h2 className={styles.question}>{question}</h2>
      <ul className={styles.options}>
        {options.map((option, index) => (
          <li key={index} className={styles.option}>
            <input
              type="radio"
              name={`question-${question}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionClick(option)}
            />
            {option}
          </li>
        ))}
      </ul>
      <button className={styles.checkAnswer} onClick={handleCheckAnswer}>
        Провери отговора
      </button>
    </div>
  );
};

export default QuizQuestion;
