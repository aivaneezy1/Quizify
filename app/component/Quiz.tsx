"use client";
import React, { useEffect, useState } from "react";
import { QuestionType } from "../types/type";
import { useAuth } from "@clerk/nextjs";
import StatsCardComponent from "./StatsCard";
import Link from "next/link";
const QuizComponent = ({ questionProp }: QuestionType) => {
  const { userId } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const isLastQuestion = currentQuestionIndex >= questionProp.length - 1;

  const currentQuestion = questionProp[currentQuestionIndex];
  const { question, answers, correctAnswer } = currentQuestion || {};

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
    handleNextQuestion(); // Automatically go to the next question when time is up
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
      setTimeRunning(false);
      return;
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer("");
    setAnswered(false);
    handleResetTime();
    handleTimeStarted();
  };

  const handleAnswerSelected = async (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === correctAnswer;

    const updatedResults = {
      score: isCorrect ? results.score + 5 : results.score,
      correctAnswers: isCorrect
        ? results.correctAnswers + 1
        : results.correctAnswers,
      wrongAnswers: !isCorrect
        ? results.wrongAnswers + 1
        : results.wrongAnswers,
    };

    setResults(updatedResults);
    setAnswered(true);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: userId,
          quizScore: updatedResults.score,
          correctAnswer: updatedResults.correctAnswers,
          wrongAnswer: updatedResults.wrongAnswers,
        }),
      });

      if (!res.ok) {
        console.error("Failed to store quiz results");
      }
    } catch (err) {
      console.error("Error while storing quiz results", err);
    }
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

  useEffect(() => {
    if (quizCompleted) {
      setTimeRunning(false); // Stop the timer when quiz is completed
    }

    if (answered) {
      setTimeRunning(false);
    }
  }, [quizCompleted, answered]);

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setAnswered(false);
    setQuizCompleted(false);
    setResults({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    handleResetTime();
    handleTimeStarted();
  };

  return (
    <>
      {quizCompleted ? (
        <>
          <h2 className="text-center text-4xl font-bold mt-10">
            Your Result 📈
          </h2>
          <div className="font-2xl grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
            <div>
              <StatsCardComponent
                title="Percentage"
                value={(results.score / (5 * questionProp.length)) * 100}
              />
            </div>
            <div>
              <StatsCardComponent
                title="Total Questions"
                value={questionProp.length}
              />
            </div>
            <div>
              <StatsCardComponent title="Total Score" value={results.score} />
            </div>
            <div>
              <StatsCardComponent
                title="Correct Answers"
                value={results.correctAnswers}
              />
            </div>
            <div>
              <StatsCardComponent
                title="Wrong Answers"
                value={results.wrongAnswers}
              />
            </div>
          </div>
          {!userId && (
            <div className="flex items-center justify-center mt-10">
            <p className="text-xl text-center mb-4 text-gray-700 font-semibold">
              <span className="font-bold">
                {" "}
                <Link href="/signIn">Login</Link>{" "}
              </span>
              to keep track of your stats and climb the leaderboard.
            </p>
          </div>
          )}
          <div className="flex items-center justify-center space-x-4 mt-5">
            <button
              onClick={handlePlayAgain}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-8 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Play Again
            </button>
            <Link href="/category">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-8 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Change Categories
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-black text-2xl p-6">
          {timeRemaining < 5 ? (
            <h2 className="text-3xl font-semibold mb-4">
              <span className="text-red-500">{timeRemaining} seconds </span> to
              answer
            </h2>
          ) : (
            <h2 className="text-3xl font-semibold mb-4">
              {timeRemaining} seconds to answer
            </h2>
          )}

          <div className="mb-6">
            <h2 className="text-xl mb-2">
              Question {currentQuestionIndex + 1} of {questionProp.length}
            </h2>
            <h3 className="text-2xl font-bold mb-4">{question}</h3>
            <ul className="space-y-3">
              {answers &&
                answers.map((ans, ansIndex) => (
                  <li key={ansIndex}>
                    <button
                      onClick={() => handleAnswerSelected(ans)}
                      disabled={answered}
                      className={`w-full p-3 rounded-lg text-lg transition-all duration-300 transform ${
                        answered && ans === correctAnswer
                          ? "bg-green-500 text-white scale-105"
                          : answered && ans !== selectedAnswer
                            ? "bg-red-500 text-white opacity-50"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                      }`}
                    >
                      {ans}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <button
            onClick={handleNextQuestion}
            className={`text-white  py-3 px-6 rounded-lg text-lg transition-all duration-300 transform ${
              answered
                ? "bg-blue-600 hover:bg-blue-800 hover:scale-105 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!answered}
          >
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      )}
    </>
  );
};

export default QuizComponent;
