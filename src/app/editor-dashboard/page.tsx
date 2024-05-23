"use client";
import React from "react";
import { cardData, editorDashboard } from "../data";
import Card from "../component/Card";
import SearchBar from "../component/SearchBar";
import EditorLayout from "../component/EditorLayout";
import InformationTab from "../component/InformationTab";

const EditorDashboard = () => {
  const handleSearch = () => {};

  return (
    <div className="px-8 md:px-12">
      <SearchBar onSearch={handleSearch} />

      <InformationTab data={editorDashboard} />

      <EditorLayout>
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
      </EditorLayout>
    </div>
  );
};

export default EditorDashboard;
