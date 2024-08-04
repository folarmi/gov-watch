"use client";
import React from "react";
import SearchBar from "../component/SearchBar";
import { cardData } from "../data";
import Card from "../component/Card";
import SeeAllPublications from "../component/SeeAllPublications";
import withAdminAuth from "../hoc/withAdminAuth";

const AdminDashboard = () => {
  const handleSearch = () => {};

  return (
    <div>
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
      <SeeAllPublications />
    </div>
  );
};

export default withAdminAuth(AdminDashboard);
