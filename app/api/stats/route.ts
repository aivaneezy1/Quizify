import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/connectDb";
import User from "@/app/models/User";
import QuizResult from "@/app/models/Quiz";
export const GET = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectDB();

    // Fetch only the specific fields
    const users = await User.find({}, 'firstName lastName imageUrl quizScore clerkId');
    const quiz = await QuizResult.find({}, 'quizScore clerkId');

    // Return the result
    return NextResponse.json({user: users, quizResult: quiz});
  } catch (err) {
    console.error('Error fetching users:', err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
};
