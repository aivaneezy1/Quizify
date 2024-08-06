"use server"
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import React from "react";

export const GET = async () => {
  const { userId } = auth();
  // getting the current user
  try{
    const user = await currentUser();
    if(!user){
        return NextResponse.json({message: "No current User found"})
    }


  return NextResponse.json(
    {
      messagge: "Authenticated",
      data: { userId: userId, username: user?.username },
    },
    { status: 200 }
  );
  }catch(err){
    console.log(err);
    return NextResponse.json({message: err}, {status:400} )
  }
};
