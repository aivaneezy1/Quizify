import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./component/Navbar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Quizify",
  description: "Take a quiz and find out your knowledge ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body>
          <ClerkLoading>
            <div className="flex justify-center items-center h-screen text-2xl">
              LOADING..
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Navbar />
            {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
