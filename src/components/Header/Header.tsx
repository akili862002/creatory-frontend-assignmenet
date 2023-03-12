"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../Button/Button";

export default function Header() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn();
  };

  const isLoading = session === undefined;

  return (
    <div className="flex flex-row justify-between w-full h-12 py-2">
      <div>
        <Link href="/">
          <img src="/logo.png" className="w-auto h-full" />
        </Link>
      </div>
      <div>
        {isLoading && (
          <div className="w-20 h-full bg-gray-200 rounded-lg animate-pulse"></div>
        )}
        {session?.user && (
          <Button onClick={handleSignOut} variant="text">
            Sign out
          </Button>
        )}
        {!session?.user && !isLoading && (
          <Button onClick={handleSignIn}>Sign in</Button>
        )}
      </div>
    </div>
  );
}
