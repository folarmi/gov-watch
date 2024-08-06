"use client";
import React from "react";
import { contributorDashboard, contributorSideBarItems } from "../data";
import Image from "next/image";
import SearchBar from "../component/SearchBar";
import InformationTab from "../component/InformationTab";
import SeeAllPublications from "../component/SeeAllPublications";
import CreatePublication from "../component/CreatePublication";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ContributorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const handleSearch = () => {};
  const pathName = usePathname();

  return (
    <div className="px-8 md:px-12">
      <SearchBar onSearch={handleSearch} />

      <InformationTab data={contributorDashboard} />
      <div className="flex">
        <section className="bg-green_100 text-white my-10 mr-8 pt-6 rounded-lg">
          {contributorSideBarItems.map(({ id, name, image, path }) => {
            return (
              // <div className="flex items-center pb-11" key={id}>
              <div
                className={`flex items-center py-4 px-8 mb-6 ${
                  pathName === path ? "bg-green_300" : ""
                }`}
                key={id}
              >
                <Image src={image} alt="item icon" className="" />
                <Link
                  href={path}
                  className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer"
                >
                  {name}
                </Link>
              </div>
            );
          })}
        </section>
        <main className="w-auto">{children}</main>
      </div>

      <SeeAllPublications />
      <CreatePublication />
    </div>
  );
};

export default ContributorLayout;
