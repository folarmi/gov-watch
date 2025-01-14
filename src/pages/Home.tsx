/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { queryParamsToAdd } from "../utils";
import { useForm } from "react-hook-form";

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [articles, setArticles] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [isArticleBookMarked, setIsArticleBookMarked] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [queryParam, setQueryParam] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const pageSize = 36;

  const { control, handleSubmit } = useForm();
  const { isAuthenticated } = useAuth();
  const { userId, userObject } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetData({
    url: `Publications/GetLatestPublications?categoryName=${
      categoryName === "all" ? "" : categoryName
    }&searcherId=${userId}${
      userObject?.country ? `&countryName=${userObject.country}` : ""
    }&${queryParamsToAdd(
      selectedFilter,
      queryParam
    )}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: [
      "publications",
      categoryName,
      queryParam,
      userObject?.country,
      pageNumber,
    ],
  });

  // useEffect(() => {
  //   if (articlesData?.length > 0) {
  //     setArticles((prev: any) => [...prev, ...articlesData]);
  //   }
  //   // If the current fetch returns fewer items than pageSize, it means no more data
  //   if (articlesData?.length < pageSize) {
  //     setHasMore(false);
  //   }
  // }, [articlesData]);

  useEffect(() => {
    // Reset articles when categoryName or filters change
    if (pageNumber === 1) {
      setArticles(articlesData || []); // Replace articles with the new data
    } else if (articlesData?.length > 0) {
      setArticles((prev: any) => [...prev, ...articlesData]); // Append for infinite scrolling
    }

    // If the current fetch returns fewer items than pageSize, no more data
    if (articlesData?.length < pageSize) {
      setHasMore(false);
    }
  }, [articlesData, pageNumber, categoryName, selectedFilter, queryParam]);

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      scrollHeight - scrollTop <= clientHeight + 100 &&
      hasMore &&
      !isLoading
    ) {
      setPageNumber((prev) => prev + 1); // Load the next page
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

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

    setSelectedCard(id);
    setIsArticleBookMarked((prev) => !prev);

    try {
      await createBookmarkMutation.mutateAsync(formData);
    } catch (error) {
      setIsArticleBookMarked((prev) => !prev);
    }
  };

  const toggleLikedStatus = (id: string) => {
    console.log(id);
    if (!isAuthenticated) {
      toast("Please sign in to like an article");
      return;
    }
  };

  const toggleComment = (id: string) => {
    console.log(id);
    if (!isAuthenticated) {
      toast("Please sign in to comment");
      return;
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
            name="queryParam"
          />
        </form>
        <HeroSection />

        <ScrollableCategories
          onClick={getCategory}
          categories={categoriesDataFormatted}
        />
        <>
          {articles?.length < 1 ? (
            <EmptyPage />
          ) : (
            <section className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {articles &&
                articles?.map(
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
                          selectedCard={selectedCard}
                          onBookMarkClick={(id: string) =>
                            toggleBookMarkStatus(id)
                          }
                          onLikeClicked={(id: string) => toggleLikedStatus(id)}
                          onCommentClicked={(id: string) => toggleComment(id)}
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
