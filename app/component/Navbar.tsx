import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import UserMenu from "./UserMenu";

const Navbar = async () => {
  const { userId } = auth();

  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-semibold">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          Quizify 📈
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <UserMenu />
        <div className="flex items-center space-x-4">
          {!userId ? (
            <Link
              href="/signIn"
              className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <UserButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
