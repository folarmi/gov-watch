/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroSection from "../component/HeroSection";
import ScrollableCategories from "../component/ScrollableCategories";
import SearchBar from "../component/SearchBar";
import ExploreButton from "../component/ExploreButton";
// import SeeAllPublications from "../component/SeeAllPublications";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import { useEffect, useState } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

import { useForm } from "react-hook-form";
import { InfiniteScrolling } from "../component/InfiniteScrolling";
import { convertCountryType, queryParamsToAdd } from "../utils";
import Card from "../component/Card";
import { Article } from "../types/generalTypes";
import { useAuth } from "../context/AuthContext";
import { CountryType, updateCountryType } from "../lib/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { countryType } = useAppSelector((state: RootState) => state.auth);

  const [categoryName, setCategoryName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [queryParam, setQueryParam] = useState("");
  const [pageNumber, setPageNumber] = useState<any>(1);
  // const [loading, setLoading] = useState(false);
  const pageSize = 12;

  const { control, handleSubmit } = useForm();
  const { userId, userObject } = useAppSelector(
    (state: RootState) => state.auth
  );

  const hasQueryParams = queryParamsToAdd(selectedFilter, queryParam);
  const url = `Publications/GetLatestPublications?categoryName=${
    categoryName === "all" ? "" : categoryName
  }&searcherId=${userId}${
    isAuthenticated && !hasQueryParams
      ? `&countryName=${convertCountryType(countryType, userObject)}`
      : ""
  }${
    hasQueryParams ? `&${hasQueryParams}` : ""
  }&pageNumber=${pageNumber}&pageSize=${pageSize}`;

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetData({
    url,
    queryKey: [
      "GetlatestPublications",
      categoryName,
      queryParam,
      userObject?.country,
      JSON.stringify(pageNumber),
      countryType,
      // pageNumber,
    ],
  });

  const { data: categoriesData, isLoading: categoriesDataisLoading } =
    useGetData({
      url: "Categories/GetAllCategories",
      queryKey: ["GetAllCategories", "homePage"],
    });

  useEffect(() => {
    setPageNumber(1);
  }, [queryParam, selectedFilter]);

  const categoriesDataFormatted =
    categoriesData?.categoryViewModel &&
    categoriesData?.categoryViewModel?.map((item: any) => {
      return {
        id: item?.id,
        name: item?.name,
      };
    });

  if (categoriesDataisLoading || categoriesDataisLoading) return <Loader />;

  const getCategory = (data: any) => {
    setCategoryName(data);
    // setLoading(true);
  };

  const submitForm = (data: any) => {
    setQueryParam(data?.queryParams);
  };

  const resetState = () => {
    setQueryParam("");
    setSelectedFilter("");
    setPageNumber(1);
  };

  return (
    <OuterPage resetState={resetState}>
      <div className="px-8 md:px-24">
        <form onSubmit={handleSubmit(submitForm)}>
          <SearchBar
            setSelectedFilter={setSelectedFilter}
            setQueryParam={setQueryParam}
            control={control}
            name="queryParam"
            loading={isLoading}
          />
        </form>
        <HeroSection />

        {isAuthenticated && (
          <div className="flex justify-center my-6">
            {userObject?.countryOfInterest !== null ? (
              <div className="flex justify-center my-6">
                <div className="flex bg-gray-100 rounded-full p-1">
                  {(["Origin", "Residence", "Interest"] as CountryType[]).map(
                    (type) => (
                      <button
                        key={type}
                        className={`px-4 py-2 rounded-full ${
                          countryType === type
                            ? "bg-primary text-white"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => dispatch(updateCountryType(type))}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center my-4">
                <span className="mr-3">Origin</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={countryType === "Residence"}
                    onChange={() =>
                      dispatch(
                        updateCountryType(
                          countryType === "Origin" ? "Residence" : "Origin"
                        )
                      )
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className="ml-3">Residence</span>
              </div>
            )}
          </div>
        )}

        <ScrollableCategories
          onClick={getCategory}
          categories={categoriesDataFormatted}
          // isLoading={loading}
        />

        {/* <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {["Origin", "Residence", "Interest",].map((type) => (
              <button
                key={type}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  countryType === type
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                // onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </nav>
        </div> */}

        <InfiniteScrolling
          data={articlesData}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          isLoading={isLoading}
          error={error}
          keyExtractor={(article) => article?.publicId}
          pageSize={pageSize}
          colSize={4}
          renderItem={(article: Article) => (
            <Card
              section={article?.section}
              articleTitle={article?.title}
              summary={article?.summary}
              date={article?.date}
              promise={article?.isPromise}
              imageUrl={article?.image}
              deadline={article?.promiseDeadline}
              id={article?.publicId}
              isPromisedFulfilled={article?.isPromiseFulfilled}
              isCredible={article?.isCredible}
              isBookMarked={article?.isBookmarked}
              isLiked={article?.isLiked}
              isPublished
              dateIncidentStarted={article?.dateIncidentStarted}
              dateIncidentResolved={article?.dateIncidentResolved}
              link={`/latest-publications/${article?.publicId}`}
            />
          )}
        />

        <ExploreButton />
      </div>
    </OuterPage>
  );
};

export { Home };
