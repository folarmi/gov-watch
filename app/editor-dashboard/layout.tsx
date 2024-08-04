"use client";

import React from "react";
import { editorDashboard, editorSideBarItems } from "../data";
import Image from "next/image";
import SearchBar from "../component/SearchBar";
import InformationTab from "../component/InformationTab";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EditorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const handleSearch = () => {};
  const pathName = usePathname();

  return (
    <section className="px-8 md:px-12">
      <SearchBar onSearch={handleSearch} />

      <InformationTab data={editorDashboard} />
      <div className="flex">
        <section className="bg-green_100 text-white my-10 mr-8 pt-6 rounded-lg">
          {editorSideBarItems.map(({ id, name, image, path }) => {
            return (
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
    </section>
  );
};

export default EditorLayout;
