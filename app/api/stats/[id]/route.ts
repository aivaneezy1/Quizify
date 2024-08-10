import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { connectDB } from "@/app/lib/connectDb"
import User from "@/app/models/User"
import QuizResult from "@/app/models/Quiz"

interface Params {
  id: string;
}
export const GET = async(req:NextRequest, context: { params: Params }) =>{
    const { id } = context.params;

    try{
        await connectDB();
        const getPost = await QuizResult.findOne({ clerkId: id});
         return new NextResponse(JSON.stringify(getPost), { status: 200 });
    }catch(err){
        console.log(err)
        return new NextResponse(
      "Error in connecting to the database " + err,
      { status: 500 }
    );
    }
}