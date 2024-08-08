"use client";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../(auth)/actions/fetchUser";
import { QuestionType } from "../types/type";

const QuizComponent = ({ questions, userId }: QuestionType) => {
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [timeRunning, setTimeRunning] = useState(false);

  const handleTimeStarted = () => {
    setTimeRunning(true);
  };

  const handleTimeEnded = () => {
    setTimeRunning(false);
  };

  const handleResetTime = () => {
    setTimeRemaining(25);
  };

  const handleTimeUp = () => {
    handleTimeEnded();
    handleResetTime();
    // calling our next question function
    //handleNextQuestion();
  };

  const handleNextQuestion = () => {
    handleTimeStarted(); // starting the time
  };

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
    <div className="bg-blue-500 text-white text-2xl">
      <h2>{timeRemaining} seconds to answer</h2>
    </div>
  );
};

export default QuizComponent;
