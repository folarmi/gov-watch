"use client";

import React from "react";
import { cardData } from "../../data";
import Card from "../../component/Card";
import ExploreButton from "../../component/ExploreButton";
import SeeAllPublications from "../../component/SeeAllPublications";

const BookMarks = () => {
  return (
    <div className="">
      <section className="mt-10 flex flex-wrap justify-between">
        {cardData.map(
          ({ articleTitle, date, imageUrl, section, summary, promise }) => {
            return (
              <div
                key={articleTitle}
                className="flex items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
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

export default BookMarks;
