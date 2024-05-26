import React from "react";
import { cardData } from "../../data";
import Card from "../../component/Card";

const PendingPublications = () => {
  return (
    <div className="">
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
    </div>
  );
};

export default PendingPublications;
