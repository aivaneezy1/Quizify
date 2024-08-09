"use client";
import React, { useEffect, useState } from "react";
import { QuestionType } from "../types/type";

const QuizComponent = ({ questionProp, userId }: QuestionType) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);


  // getting the current answer
  const { questions, answer, correctAnswer } = questionProp[currentQuestionIndex];

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [timeRunning, setTimeRunning] = useState(false);

  const handleTimeStarted = () => {
    setTimeRunning(true);
  };

  const handleTimeEnded = () => {
    setTimeRunning(false);
  };

  const handleResetTime = () => {
    setTimeRemaining(10);
  };

  const handleTimeUp = () => {
    handleTimeEnded();
    handleResetTime();

  };


    // Next Question function
  const handleNextQuestion = () => {
    // setting the index for the prev
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer("");
    setAnswered(false);
     // starting the time for the new question
    handleTimeStarted();
  };


  // Answer selected function
  const handleAnswerSelected = (answer:string) =>{
    setSelectedAnswer(answer);
    setAnswered(true)
  }



  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeRunning, timeRemaining]);

  return (
    <div className="bg-blue-500 text-white text-2xl p-4">
      <h2>{timeRemaining} seconds to answer</h2>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">
          {currentQuestionIndex + 1}. {questions}
        </h3>
        <ul>
          {answer.map((ans, ansIndex) => (
            <li key={ansIndex} className="text-lg">
              <button
                onClick={() => handleAnswerSelected(ans)}
                disabled={answered}
                className={`p-2 rounded ${
                  answered && ans === correctAnswer
                    ? "bg-green-500 text-white"
                    : answered && ans !== selectedAnswer
                    ? "bg-red-500 text-white"
                    : ""
                }`}
              >
                {ans}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {answered && (
        <button
          onClick={handleNextQuestion}
          className="bg-blue-700 text-white py-2 px-4 rounded"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuizComponent;
