"use client";

import Link from "next/link";
import { Button } from "../Button/Button";

export default function Header() {
  return (
    <div className="flex flex-row justify-between w-full h-12 py-2">
      <div>
        <Link href="/">
          <img src="./logo.png" className="w-auto h-full" />
        </Link>
      </div>
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  );
}
