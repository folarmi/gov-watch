/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../component/Card";
import HeroSection from "../component/HeroSection";
import ScrollableCategories from "../component/ScrollableCategories";
import SearchBar from "../component/SearchBar";
import ExploreButton from "../component/ExploreButton";
import SeeAllPublications from "../component/SeeAllPublications";
import EmptyPage from "../component/EmptyPage";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import { useState } from "react";

const Home = () => {
  const handleSearch = () => {};
  const [categoryName, setCategoryName] = useState("");

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetData({
    url: `Publications/GetLatestPublications?categoryName=${categoryName}`,
    queryKey: ["publications", categoryName],
  });

  const { data: categoriesData, isLoading: categoriesDataisLoading } =
    useGetData({
      url: "Categories/GetAllCategories",
      queryKey: ["GetAllCategories", "homePage"],
    });

  const categoriesDataFormatted =
    categoriesData?.categoryViewModel &&
    categoriesData?.categoryViewModel?.map((item: any) => {
      return {
        id: item?.id,
        name: item?.name,
      };
    });

  //   let argumentsLength = function(...args) {
  //     return arguments.length;
  // };

  if (isLoading || categoriesDataisLoading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  const getCategory = (data: any) => {
    setCategoryName(data);
  };

  return (
    <OuterPage>
      <div className="px-8 md:px-24">
        <SearchBar onSearch={handleSearch} />
        <HeroSection />

        <ScrollableCategories
          onClick={getCategory}
          categories={categoriesDataFormatted}
        />
        <>
          {articlesData?.length < 1 ? (
            <EmptyPage />
          ) : (
            <section className="mt-10 flex flex-wrap justify-between">
              {articlesData?.map(
                ({
                  title,
                  date,
                  image,
                  section,
                  summary,
                  isPromise,
                  id,
                  // publicId,
                  promiseDeadline,
                }: any) => {
                  return (
                    <div
                      // to={`/dashboard/pending/${id || publicId}`}
                      key={id}
                      className="w-full sm:w-1/2 md:w-1/3 mt-10"
                    >
                      <Card
                        section={section}
                        articleTitle={title}
                        summary={summary}
                        date={date}
                        promise={isPromise}
                        imageUrl={image}
                        deadline={promiseDeadline}
                        // imageUrl={coatOfArms}
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
    </OuterPage>
  );
};

export { Home };
