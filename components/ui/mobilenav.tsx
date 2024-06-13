"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger"
            className="cursor-pointer sm:hidden mt-1"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex itemscenter gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Y-meet"
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">Y-Meet</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full gap-6 pt-16 text-white flex-col overflow-hidden">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathName === item.route ||
                    pathName.startsWith(`${item.route}/`);
                  return (
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      key={item.label}
                      className="w-64"
                    >
                      <SheetClose asChild>
                        <Link
                          href={item.route}
                          className={cn(
                            "flex gap-4 items-center p-4 rounded-lg w-full max-w-60 hover:border hover:border-white ml-4",
                            {
                              "bg-blue-600": isActive,
                            }
                          )}
                        >
                          <Image
                            src={item.imgUrl}
                            alt={item.label}
                            width={20}
                            height={20}
                          />
                          <p className=" font-semibold ">{item.label}</p>
                        </Link>
                      </SheetClose>
                    </motion.div>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
