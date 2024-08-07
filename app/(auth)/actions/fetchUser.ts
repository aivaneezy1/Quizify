"use server";

import User from "@/app/models/User";
import { connectDB } from "@/app/lib/connectDb";
import { UserType } from "@/app/types/type";
              
export const fetchUser = async (user: UserType) => {
  try {
    await connectDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
};
