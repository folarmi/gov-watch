"use client";

import Card from "./component/Card";
import HeroSection from "./component/HeroSection";
import ScrollableCategories from "./component/ScrollableCategories";
import SearchBar from "./component/SearchBar";
import { cardData, categories } from "./data";
import ExploreButton from "./component/ExploreButton";
import SeeAllPublications from "./component/SeeAllPublications";
import EmptyPage from "./component/EmptyPage";
import Loader from "./component/Loader";
import { useGetData } from "./hooks/apiCalls";

export default function Home() {
  const handleSearch = () => {};

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetData({
    url: "Publications/GetLatestPublications",
    queryKey: ["publications"],
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="px-8 md:px-24">
      <SearchBar onSearch={handleSearch} />
      <HeroSection />

      <ScrollableCategories categories={categories} />
      <>
        {articlesData?.length < 1 ? (
          <EmptyPage />
        ) : (
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
        )}
      </>

      {articlesData?.length > 1 && <SeeAllPublications />}
      <ExploreButton />
    </div>
  );
}
