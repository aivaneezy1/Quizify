
import React from "react";
import QuizComponent from "../component/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUser } from "../(auth)/actions/fetchUser";

export const dynamic = "force-dynamic";

const getData = async () => {
  const query = `*[_type == "questions"] {
    questions,
    answer,
    correctAnswer}`;

  const data = await client.fetch(query);

  return data;
};

const Quizpage = async () => {
  const questions = await getData();
  const userId = "23232"

  return (
    <div>
      <QuizComponent questionProp={questions} userId={userId}/>

    </div>
  );
};

export default Quizpage;
