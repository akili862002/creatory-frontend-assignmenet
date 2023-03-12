"use client";

import "@/config/axios";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col items-center w-full min-h-screen px-3">
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <div className="w-full max-w-2xl">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
