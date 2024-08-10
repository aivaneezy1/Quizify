"use client";
import React, { useContext } from "react";
import { DatiContext } from "../provider/Provider";
import QuizComponent from "../component/Quiz";
import { getProgrammingData } from "../utils/getData";
import { getAnimalData } from "../utils/getData";
import { getGeographyData } from "../utils/getData";
import { getScienceTechData } from "../utils/getData";
import { getEasyArtData } from "../utils/getData";
import { getSportsData } from "../utils/getData";

const handleCategory = () => {
  const context = useContext(DatiContext);

  if (!context) {
    // Handle the case where context is not available
    return [];
  }

  const { selectedCategories } = context;

  switch (selectedCategories) {
    case "Animals":
      return getAnimalData();
    case "Programming":
      return getProgrammingData();

    case "Geography":
      return getGeographyData();

    case "Science & Technology":
      return getScienceTechData();

    case "Art":
      return getEasyArtData();

    case "Sports":
      return getSportsData();

    default:
      return [];
  }
};

const Quizpage = () => {
  const questions = handleCategory();

  return (
    <div>
      <QuizComponent questionProp={questions} />
    </div>
  );
};

export default Quizpage;
