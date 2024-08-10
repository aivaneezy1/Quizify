"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Loading from "../utils/loading";
const StatsComponent = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [data, setData] = useState< any>(null); // Adjust type based on expected data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const res = await fetch(`/api/stats/${userId}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && userId) {
      handleGetData();
    }
  }, [isLoaded, userId]);

  if (loading){
    return(
      <div className="flex min-h-screen items-center justify-center">
      <Loading/>
      </div>
    )
  };
 
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-12 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        {user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()} STATS📝
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">Total Points 🌟</h3>
          <span className="text-3xl font-bold">{data?.quizScore || '0'}</span>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">Correct Answers ✅</h3>
          <span className="text-3xl font-bold">{data?.correctAnswer || '0'}</span>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">Wrong Answers ❌</h3>
          <span className="text-3xl font-bold">{data?.wrongAnswer || '0'}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
