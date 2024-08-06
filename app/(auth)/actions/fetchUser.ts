"user server"

import User from "@/app/models/User"
import { connectDB } from "@/app/lib/connectDb"

export const fetchUser = async(user: any) =>{
    try{
      await connectDB();
      const newUser = await User.create(user);
    }catch(err){
      console.log(err);
    }
}