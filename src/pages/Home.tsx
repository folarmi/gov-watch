/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../component/Card";
import HeroSection from "../component/HeroSection";
import ScrollableCategories from "../component/ScrollableCategories";
import SearchBar from "../component/SearchBar";
import ExploreButton from "../component/ExploreButton";
// import SeeAllPublications from "../component/SeeAllPublications";
import EmptyPage from "../component/EmptyPage";
import Loader from "../component/Loader";
import { useCustomMutation, useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import { useState } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { queryParamsToAdd } from "../utils";
import { useForm } from "react-hook-form";

const Home = () => {
  const { control, handleSubmit } = useForm();
  const { isAuthenticated } = useAuth();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [categoryName, setCategoryName] = useState("");
  const [isArticleBookMarked, setIsArticleBookMarked] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [queryParam, setQueryParam] = useState("");

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetData({
    url: `Publications/GetLatestPublications?categoryName=${
      categoryName === "all" ? "" : categoryName
    }&?searcherId=${userId}&${queryParamsToAdd(selectedFilter, queryParam)}`,
    queryKey: ["publications", categoryName, queryParam],
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

  const createBookmarkMutation = useCustomMutation({
    endpoint: "UserBookmarks/CreateUserBookmark",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      // window.location.reload();
    },
  });

  const toggleBookMarkStatus = async (id: string) => {
    if (!isAuthenticated) {
      toast("Please sign in to bookmark an article");
      return;
    }

    const formData = {
      userPublicId: userId,
      publicationPublicId: id,
    };

    setIsArticleBookMarked((prev) => !prev);

    try {
      await createBookmarkMutation.mutateAsync(formData);
    } catch (error) {
      setIsArticleBookMarked((prev) => !prev);
    }
  };

  if (isLoading || categoriesDataisLoading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  const getCategory = (data: any) => {
    setCategoryName(data);
  };

  const submitForm = (data: any) => {
    setQueryParam(data?.queryParams);
  };

  return (
    <OuterPage>
      <div className="px-8 md:px-24">
        <form onSubmit={handleSubmit(submitForm)}>
          <SearchBar
            setSelectedFilter={setSelectedFilter}
            setQueryParam={setQueryParam}
            control={control}
            name="queryParams"
          />
        </form>
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
              {articlesData &&
                articlesData?.map(
                  ({
                    title,
                    date,
                    image,
                    section,
                    summary,
                    isPromise,
                    publicId,
                    promiseDeadline,
                    isBookmarked,
                  }: any) => {
                    return (
                      <div
                        key={publicId}
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
                          id={publicId}
                          onBookMarkClick={(id: string) =>
                            toggleBookMarkStatus(id)
                          }
                          // imageUrl={coatOfArms}
                          isBookMarked={isBookmarked}
                          isArticleBookMarked={isArticleBookMarked}
                          setIsArticleBookMarked={setIsArticleBookMarked}
                          isPublished
                          link={`/latest-publications/${publicId}`}
                        />
                      </div>
                    );
                  }
                )}
            </section>
          )}
        </>

        {/* {articlesData?.length > 1 && <SeeAllPublications />} */}
        <ExploreButton />
      </div>
    </OuterPage>
  );
};

export { Home };
