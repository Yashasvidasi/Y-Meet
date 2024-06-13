import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./mobilenav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex itemscenter gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Y-meet"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Y-Meet
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverActionButton:
                  "text-white hover:text-slate-400 hover:cursor-pointer",
                badge: "text-white",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;
