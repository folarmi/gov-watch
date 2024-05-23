"use client";
import React from "react";
import { cardData, editorDashboard } from "../data";
import Card from "../component/Card";
import SearchBar from "../component/SearchBar";
import Text from "../component/Text";
import EditorLayout from "../component/EditorLayout";

const EditorDashboard = () => {
  const handleSearch = () => {};

  return (
    <div className="px-8 md:px-12">
      <SearchBar onSearch={handleSearch} />

      <div className="flex items-center justify-between px-16 bg-green_300 rounded-lg py-9">
        {editorDashboard.map(({ id, name, number }) => {
          return (
            <div key={id}>
              <Text className="text-green_200" variant="heading">
                {number}
              </Text>
              <Text variant="caption" className="text-center text-grey_100">
                {name}
              </Text>
            </div>
          );
        })}
      </div>

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
