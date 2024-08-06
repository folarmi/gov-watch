"use client";
import React from "react";
import { contributorSideBarItems } from "../data";
import SearchBar from "../component/SearchBar";
import InformationTab from "../component/InformationTab";
import SeeAllPublications from "../component/SeeAllPublications";
import CreatePublication from "../component/CreatePublication";
import withAuth from "../hoc/withAuth";
import { useGetDataById } from "../hooks/apiCalls";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const handleSearch = () => {};
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);

  const { data: userCountData, isLoading: userCountIsLoading } = useGetDataById(
    {
      url: `GetAllUserBookmarksByUserId?userPublicId=${userId}`,
      queryKey: ["GetCountOfUsers"],
    }
  );
  console.log(userCountData);

  const customerDashboard = [
    {
      id: 1,
      name: "Total Read",
      number: 700,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Total Liked Post",
      number: 156,
      path: "/dashboard/liked-post",
    },
    {
      id: 3,
      name: "Bookmarks",
      number: 400,
      path: "/dashboard/bookmarks",
    },
  ];

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

export default withAuth(DashboardLayout);
