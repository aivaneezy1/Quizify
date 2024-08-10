"use client";
import React from "react";
import StatsComponent from "../component/Stats";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Statspage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <>
      {!isSignedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen   p-4 rounded-md shadow-md text-center">
          <div className="text-red-700 bg-red-100 p-8 rounded-lg"> You need to <span className="font-bold"><Link href="/signIn">sign in</Link></span> to view your stats</div>
        </div>
      ) : (
        <div>
          <StatsComponent />
        </div>
      )}
    </>
  );
};

export default Statspage;
