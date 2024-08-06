"use client";

import React from "react";
import { adminDashboard, adminDashboardSideBarItems } from "../data";
import Image from "next/image";
import InformationTab from "../component/InformationTab";
import CreatePublication from "../component/CreatePublication";
import pending from "../../../public/pending.svg";
import iconSeven from "../../../public/iconSeven.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import SearchBar from "../component/SearchBar";

const AdminDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  // const handleSearch = () => {};

  return (
    <section className="px-8 md:px-24">
      {/* <SearchBar onSearch={handleSearch} /> */}
      <InformationTab data={adminDashboard} />
      <div className="flex ">
        <section className="bg-green_100 text-white my-10 mr-8 pt-6 rounded-lg">
          <div className="flex items-center px-8 mb-6">
            <Image src={iconSeven} alt="item icon" />
            <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
              Unapproved Publications
            </p>
          </div>

          <p className="text-base font-medium px-8 pb-8 cursor-pointer">
            Editing
          </p>
          <div className="flex items-center px-8 mb-6">
            <Image src={pending} alt="item icon" />
            <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
              Pending Publications
            </p>
          </div>

          <p className="text-base font-medium px-8 pb-8 cursor-pointer">
            Admin
          </p>
          {adminDashboardSideBarItems.map(({ id, name, image, link }) => {
            return (
              <div
                className={`flex items-center py-4 px-8 mb-6 ${
                  pathName === link ? "bg-green_300" : ""
                }`}
                key={id}
              >
                <Image src={image} alt="item icon" className="" />
                <Link
                  href={link}
                  className={`text-base font-medium whitespace-nowrap mx-5 cursor-pointer`}
                >
                  {name}
                </Link>
              </div>
            );
          })}
        </section>
        <main className="w-auto">{children}</main>
      </div>
      <CreatePublication />
    </section>
  );
};

export default AdminDashboardLayout;
