"use client";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-12 px-6">
     
      <h2 className="text-6xl font-bold text-gray-800 mb-4">
        Ready to take the quiz?
      </h2>
      <h3 className="text-2xl text-gray-600 mb-8">
        Get ready to ace it
      </h3>
      <p className="text-xl text-gray-600 mb-8">
        With <span className="font-bold text-blue-600">6 categories</span> of quiz to choose from
      </p>
      <Link href="/category">
        <button className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
          Click here to play
        </button>
      </Link>
    </div>
  );
};

export default Hero;
