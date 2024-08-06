
import React from "react";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
const Navbar = async () => {
  const { userId } = auth();

  return (
    <div className="flex justify-between p-4 bg-gray-500">
      <div className="text-white">
        <Link href="/">Logo</Link>
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
  );
};

export default Navbar;
