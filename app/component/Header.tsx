"use client";

import React, { useState } from "react";
import logo from "../../public/logo.svg";
// import darkModeLogo from "../../../public/logoDarkMode.svg";
import harmburger from "../../public/harmburger.svg";
import closeIcon from "../../public/closeIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomButton from "./CustomButton";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { SidebarItemProp } from "../types/generalTypes";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { dashboardPath } from "../utils";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const pathName = usePathname();
  const { theme } = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const SidebarList: SidebarItemProp[] = [
    {
      id: 1,
      name: `Latest ${isAuthenticated ? "Publications" : "Articles"} `,
      url: "/",
    },
    {
      id: 2,
      name: "Contact us",
      url: "/contact",
    },
    {
      id: 3,
      name: "About us",
      url: "/about-us",
    },
    {
      id: 4,
      name: "Dashboard",
      url: `${dashboardPath(userType)}`,
    },
    {
      id: 5,
      name: `${isAuthenticated ? "" : "Sign up"}`,
      url: "/signup",
    },
  ];

  return (
    <>
      <nav className="px-8 md:px-0 flex items-center justify-between md:justify-around my-6">
        <Link href="/">
          <Image src={logo} alt="Company logo" className="w-8 md:w-20" />
        </Link>

        <>
          {SidebarList.map(({ name, id, url }) => {
            return (
              <div className="hidden md:flex" key={id}>
                <Link
                  className={`text-base font-medium pb-2  ${
                    pathName === url ? "border-b-2 border-green_100" : ""
                  }`}
                  href={url}
                >
                  {name}
                </Link>
              </div>
            );
          })}

          {!isAuthenticated && (
            <Link className="hidden md:flex" href="/signin">
              <CustomButton>Sign In</CustomButton>
            </Link>
          )}
        </>

        <Image
          onClick={toggleSideBar}
          className="md:hidden"
          src={harmburger}
          alt="harmburger menu"
        />
      </nav>

      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={toggleSideBar}
        ></div>
      )}

      {isSideBarOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isSideBarOpen ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-64 h-full bg-white md:hidden pl-8"
        >
          <div className="flex justify-end mt-4">
            <Image
              className="mb-10 mr-4"
              onClick={toggleSideBar}
              src={closeIcon}
              alt="close icon"
            />
          </div>
          {SidebarList.map(({ id, name, url }) => {
            return (
              <div onClick={toggleSideBar} className="pb-5" key={id}>
                <Link
                  className={`font-medium text-[15px] ${
                    pathName === url ? "text-green_100" : ""
                  }`}
                  href={url}
                >
                  {name}
                </Link>
              </div>
            );
          })}
        </motion.div>
      )}
    </>
  );
};

export { Header };
