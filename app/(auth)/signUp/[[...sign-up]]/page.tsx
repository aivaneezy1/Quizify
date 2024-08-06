import React from 'react'
import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {

  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <SignUp afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default SignUpPage
