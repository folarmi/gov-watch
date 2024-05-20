"use client";

import React from "react";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import { SidebarList } from "../data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomButton from "./CustomButton";

const Header = () => {
  const pathName = usePathname();

  return (
    <nav className="flex items-center justify-around my-6">
      <Link href="/">
        <Image src={logo} alt="Company logo" />
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
