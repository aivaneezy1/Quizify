import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./component/Navbar";

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
    <html lang="en">
      <body >
      <Navbar/>
      {children}
      </body>
    </html>
  );
}
