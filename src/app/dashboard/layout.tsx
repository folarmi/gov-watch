"use client";
import React from "react";
import { contributorSideBarItems, customerDashboard } from "../data";
import Image from "next/image";
import SearchBar from "../component/SearchBar";
import InformationTab from "../component/InformationTab";
import SeeAllPublications from "../component/SeeAllPublications";
import CreatePublication from "../component/CreatePublication";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const handleSearch = () => {};

  return (
    <div className="px-8 md:px-12">
      <SearchBar onSearch={handleSearch} />

      <InformationTab data={customerDashboard} />
      <div className="flex">
        <main className="w-auto">{children}</main>
      </div>

      <SeeAllPublications />
      <CreatePublication />
    </div>
  );
};

export default DashboardLayout;
