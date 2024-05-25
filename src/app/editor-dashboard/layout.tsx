"use client";

import React from "react";
import { editorDashboard, editorSideBarItems } from "../data";
import Image from "next/image";
import SearchBar from "../component/SearchBar";
import InformationTab from "../component/InformationTab";

const EditorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const handleSearch = () => {};
  return (
    <section className="px-8 md:px-12">
      <SearchBar onSearch={handleSearch} />

      <InformationTab data={editorDashboard} />
      <div className="flex">
        <section className="bg-green_100 text-white px-8 my-10 mr-8 pt-6 rounded-lg">
          {editorSideBarItems.map(({ id, name, image }) => {
            return (
              <div className="flex items-center pb-11" key={id}>
                <Image src={image} alt="item icon" className="" />
                <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
                  {name}
                </p>
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
