"use client";

import React from "react";
import { cardData, customerDashboard } from "../data";
import Card from "../component/Card";
import SearchBar from "../component/SearchBar";
import InformationTab from "../component/InformationTab";
import Image from "next/image";
import ExploreButton from "../component/ExploreButton";
import arrow from "../../../public/arrow.svg";
import SeeAllPublications from "../component/SeeAllPublications";

const Dashboard = () => {
  const handleSearch = () => {};

  return (
    <div className="px-8 md:px-24">
      <SearchBar onSearch={handleSearch} />
      <InformationTab data={customerDashboard} />

      <section className="mt-10 flex flex-wrap justify-between">
        {cardData.map(
          ({ articleTitle, date, imageUrl, section, summary, promise }) => {
            return (
              <div
                key={articleTitle}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <Card
                  section={section}
                  articleTitle={articleTitle}
                  summary={summary}
                  date={date}
                  promise={promise}
                  imageUrl={imageUrl}
                />
              </div>
            );
          }
        )}
      </section>
      <SeeAllPublications />
      <ExploreButton />
    </div>
  );
};

export default Dashboard;
