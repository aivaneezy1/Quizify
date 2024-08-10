  import { connectDB } from "@/app/lib/connectDb";
import Quiz from "@/app/models/Quiz";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { clerkId, quizScore, correctAnswer, wrongAnswer } =
    await request.json();
  if (request.method === "POST") {
    await connectDB();
    try {
      // Check if the user already has a quiz record
      let existingUser = await Quiz.findOne({ clerkId });
      if (existingUser) {
        const updateResult = await Quiz.findOneAndUpdate(
          { clerkId: clerkId },
          {
            $set: {
              quizScore: quizScore, // Set the score directly from the incoming data
              correctAnswer: correctAnswer, // Set the correct answers directly from the incoming data
              wrongAnswer: wrongAnswer, // Set the wrong answers directly from the incoming data
            },
          },
          { new: true }
        );
        return NextResponse.json({ updateResult });
      } else {
        // Create a new quiz record for the user
        const newUser = await Quiz.create({
          clerkId,
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
