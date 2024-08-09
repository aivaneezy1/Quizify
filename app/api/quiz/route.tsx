import { connectDB } from "@/app/lib/connectDb";
import Quiz from "@/app/models/Quiz";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userId, quizScore, correctAnswer, wrongAnswer } =
    await request.json();
  if (request.method === "POST") {
    await connectDB();
    try {
      // Check if the user already has a quiz record
      let existingUser = await Quiz.findOne({ userId });

      if (existingUser) {
        // Update the existing user’s quiz results
        existingUser.quizScore += quizScore;
        existingUser.correctAnswer += correctAnswer;
        existingUser.wrongAnswer += wrongAnswer;

        const updateResult = await existingUser.save();
        return NextResponse.json({ updateResult });
      } else {
        // Create a new quiz record for the user
        const newUser = await Quiz.create({
          userId,
          quizScore,
          correctAnswer,
          wrongAnswer,
        });

        return NextResponse.json({ newUser });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "An error occurred" });
    }
  } else {
    console.log("Method is not allowed");
  }
};
