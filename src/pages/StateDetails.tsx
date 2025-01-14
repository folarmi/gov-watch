/* eslint-disable @typescript-eslint/no-explicit-any */

import Text from "../component/Text";
import TextAndValue from "../component/StateDetail";
import Card from "../component/Card";
import ExploreButton from "../component/ExploreButton";
import { Header } from "../component/Header";
import { useParams } from "react-router-dom";
import { useGetDataById } from "../hooks/apiCalls";
import Loader from "../component/Loader";
import EmptyPage from "../component/EmptyPage";
import moment from "moment";

const StateDetails = () => {
  const params = useParams();
  // const { userId } = useAppSelector((state: RootState) => state.auth);

  const { data: stateDetailsData, isLoading: stateDetailsIsLoading } =
    useGetDataById({
      url: params?.id ? `States/GetState?exactName=${params?.id}` : "",
      queryKey: ["GetState"],
    });

  const { data: statePublicationsData, isLoading: statePublicationsIsLoading } =
    useGetDataById({
      url: params?.id
        ? `Publications/GetLatestPublications?stateName=${params?.id}&page=1&pageSize=10`
        : "",
      queryKey: ["GetLatestPublicationsByState"],
    });

  return (
    <>
      {stateDetailsIsLoading || statePublicationsIsLoading ? (
        <Loader />
      ) : (
        <div className="mx-2 md:mx-24">
          <Header />
          <Text variant="heading">
            Learn about <span className="text-primary">{params?.id}</span>{" "}
            State, Her MDAs and Political actors
          </Text>
          <Text
            variant="bodyThree"
            className="pt-1 md:pt-5 pb-2 md:pb-12 text-"
          >
            {stateDetailsData?.bio}
          </Text>

          <section className="md:flex justify-between md:mx-6 mb-4 md:mb-12">
            <div className="w-[360px]">
              <TextAndValue title="Capital" value={stateDetailsData?.capital} />
              <TextAndValue
                title="Governor"
                value={stateDetailsData?.governor}
              />
              <TextAndValue
                title="Political Party of Governor"
                value={stateDetailsData?.politicalPartyOfGovernor}
              />
              <TextAndValue
                title="Population"
                value={stateDetailsData?.population}
              />
              <TextAndValue
                title="Land Mass"
                value={stateDetailsData?.landMass}
              />
              <TextAndValue
                title="Date Founded"
                value={
                  moment(stateDetailsData?.dateFounded).format("YYYY-MM-DD") ||
                  0
                }
              />
              <TextAndValue
                title="MDAs Count"
                value={stateDetailsData?.mdaCount}
              />
              <TextAndValue
                title="LGA Count"
                value={stateDetailsData?.lgaCount}
              />
            </div>

            {/* <div className="flex justify-center items-center max-w-lg">
              <img
                src={stateDetailsData?.image}
                alt="Fetched from backend"
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div> */}
            <div className="flex justify-center items-center max-w-lg">
              <img
                src={stateDetailsData?.image}
                alt="Fetched from backend"
                className="w-80 h-60 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
            </div>
          </section>

          <p className="text-base md:text-[28px] font-medium">
            Publications by <span className="text-primary">{params?.id}</span>{" "}
            state
          </p>

          <>
            {statePublicationsData?.length < 1 ? (
              <EmptyPage />
            ) : (
              // <div className="w-1/2">
              //   <img src="./emptyPage.svg" alt="emptyPageImage" />
              // </div>
              <section className="mt-4 md:mt-10 flex flex-wrap justify-between">
                {statePublicationsData?.map(
                  ({
                    title,
                    date,
                    image,
                    section,
                    summary,
                    isPromise,
                    id,
                  }: any) => {
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                      >
                        <Card
                          section={section}
                          articleTitle={title}
                          summary={summary}
                          date={date}
                          promise={isPromise}
                          imageUrl={image}
                          id={id}
                        />
                      </div>
                    );
                  }
                )}
              </section>
            )}
          </>
          {/* <section className="mt-10 flex flex-wrap justify-between">
            {statePublicationsData?.map(
              ({
                title,
                date,
                image,
                section,
                summary,
                isPromise,
                id,
              }: any) => {
                return (
                  <div key={id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <Card
                      section={section}
                      articleTitle={title}
                      summary={summary}
                      date={date}
                      promise={isPromise}
                      imageUrl={image}
                    />
                  </div>
                );
              }
            )}
          </section> */}

          <ExploreButton />
        </div>
      )}
    </>
  );
};

export { StateDetails };
