"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Define the type for user and quiz result
interface User {
  _id: string;
  clerkId: string; // Added clerkId
  firstName: string;
  lastName: string;
  imageUrl: string;
}

interface QuizResult {
  _id: string;
  clerkId: string; // Added clerkId
  quizScore: number;
}

// Combined type for the leaderboard
interface LeaderboardEntry {
  user: User;
  quizResult: QuizResult;
}

const LeaderBoardsComponent = () => {
  // State to store users and quiz results
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await fetch("/api/stats"); // Adjust the API endpoint
        const data = await response.json();

        // Combine user and quiz result data using clerkId
        const combinedData: LeaderboardEntry[] = data.user.map((user: User) => {
          const quizResult = data.quizResult.find(
            (result: QuizResult) => result.clerkId === user.clerkId // Match using clerkId
          );
          return {
            user,
            quizResult: quizResult || {
              _id: user._id,
              clerkId: user.clerkId,
              quizScore: 0,
            },
          };
        });

        // Sort by quizScore in descending order
        const sortedData = combinedData.sort(
          (a, b) => b.quizResult.quizScore - a.quizResult.quizScore
        );

        setLeaderboard(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    handleGetData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Leaderboard 🏆</h2>

      <div className="w-full max-w-4xl">
        <ul className="list-none">
          {leaderboard.map((entry, index) => (
            <li
              key={entry.user._id}
              className="flex items-center justify-between mb-4 p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center">
                <h2 className="font-bold mr-2">{index + 1}</h2>
                <Image
                  src={entry.user.imageUrl}
                  alt={`${entry.user.firstName} ${entry.user.lastName}`}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
               
                <span className={` ${index + 1 < 3 ? 'font-bold text-lg' : "text-lg font-semibold" }`}>
                  {entry.user.firstName} {entry.user.lastName} {index + 1 == 1 ? <span>👑</span> : ""}
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-700">
                Score: {entry.quizResult.quizScore}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderBoardsComponent;
