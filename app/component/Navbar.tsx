
import React from "react";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import UserMenu from "./UserMenu";
const Navbar = async () => {
  const { userId } = auth();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-500">
      <div className="text-white ">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex flex-end items-center">
        <div>
        <UserMenu/>
        </div>

       <div className="text-white">
        {!userId ? (
          <Link href="/signIn">Login</Link>
        ) : (
          <div>
            <UserButton />
          </div>
        )}
      </div>
      </div>
     
    </div>
  );
};

export default Navbar;
