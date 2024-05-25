"use client";

import React from "react";
import logo from "../../../public/logo.svg";
import darkModeLogo from "../../../public/logoDarkMode.svg";
import Image from "next/image";
import { SidebarList } from "../data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomButton from "./CustomButton";
import { useTheme } from "next-themes";

const Header = () => {
  const pathName = usePathname();
  const { theme } = useTheme();

  return (
    <nav className="hidden md:flex items-center justify-around my-6">
      <Link href="/">
        {theme === "light" ? (
          <Image src={logo} alt="Company logo" />
        ) : (
          <Image src={darkModeLogo} alt="Company logo" />
        )}
      </Link>

      {SidebarList.map(({ name, id, url }) => {
        return (
          <div key={id}>
            <Link
              className={`text-base font-bold pb-2  ${
                pathName === url ? "border-b-2 border-green_100" : ""
              }`}
              href={url}
            >
              {name}
            </Link>
          </div>
        );
      })}

      <Link href="/signin">
        <CustomButton>Sign In</CustomButton>
      </Link>
    </nav>
  );
};

export { Header };
