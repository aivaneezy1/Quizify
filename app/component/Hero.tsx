import React from "react";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-2">
      <h2 className="text-6xl font-bold text-center">Ready to take the the quiz?</h2>
      <h2 className="text-2xl text-gray-500">Get ready to ace it</h2>
      <Link href="/quiz">
      <button className="bg-blue-500 py-4 px-6 rounded-lg text-white hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
        Click here to play
      </button>
      </Link>
    </div>
  );
};

export default Hero;
