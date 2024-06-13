"use client";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky left-0 top-0 flex flex-col justify-between h-screen w-fit bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] ">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}/`);
          return (
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.99 }}
              key={item.label}
            >
              <Link
                href={item.route}
                className={cn(
                  "flex gap-4 items-center p-4 rounded-lg justify-start hover:border hover:border-white hover:cursor-pointer",
                  {
                    "bg-blue-600": isActive,
                  }
                )}
              >
                <Image
                  src={item.imgUrl}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">
                  {item.label}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
