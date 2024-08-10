"use client";
import React, { useState, useContext } from "react";
import { DatiContext } from "../provider/Provider";
import Link from "next/link";
const CategoryComponent = () => {
  const context = useContext(DatiContext);

  const { setSelectedCategories } = context;

  const handleClick = (category: string) => {
    setSelectedCategories(category);
  };



  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-10">
        Choose a category
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center cursor-pointer">
        <Link href="/quiz">
          <div
            onClick={() => handleClick("Animals")}
            className="bg-blue-500 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Animals
          </div>
        </Link>

        

        <Link href="/quiz">
          <div
            onClick={() => handleClick("Programming")}
            className="bg-green-500 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Programming
          </div>
        </Link>

        <Link href="/quiz">
          <div
            onClick={() => handleClick("Geography")}
            className="bg-purple-500 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Geography
          </div>
        </Link>

        <Link href="/quiz">
          <div
            onClick={() => handleClick("Science & Technology")}
            className="bg-yellow-500 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Science & Technology
          </div>
        </Link>

        <Link href="/quiz">
          <div
            onClick={() => handleClick("Art")}
            className="bg-red-500 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Art
          </div>
        </Link>

        <Link href="/quiz">
        <div
          onClick={() => handleClick("Sports")}
          className="bg-teal-500 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sports
        </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryComponent;
