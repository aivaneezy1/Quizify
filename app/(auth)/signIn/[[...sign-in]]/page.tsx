import React from "react";
import { SignIn } from "@clerk/nextjs";


const SignInPage = () => {

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <SignIn  afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default SignInPage;
