"use client";
import React from "react";
import { cardData, contributorDashboard } from "../data";
import Card from "../component/Card";
import SearchBar from "../component/SearchBar";
import InformationTab from "../component/InformationTab";
import ContributorLayout from "../component/ContributorLayout";

const ContributorDashboard = () => {
  const handleSearch = () => {};

  return (
    <div className="px-8 md:px-12">
      <SearchBar onSearch={handleSearch} />

      <InformationTab data={contributorDashboard} />

      <ContributorLayout>
        <section className="mt-10 flex flex-wrap justify-between">
          {cardData.map(
            ({ articleTitle, date, imageUrl, section, summary, promise }) => {
              return (
                <div key={articleTitle} className="w-full sm:w-1/2 md:w-1/3">
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
      </ContributorLayout>
    </div>
  );
};

export default ContributorDashboard;
