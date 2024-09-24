/* eslint-disable @typescript-eslint/no-explicit-any */

import Text from "../component/Text";
import TextAndValue from "../component/StateDetail";
import Card from "../component/Card";
import SeeAllPublications from "../component/SeeAllPublications";
import ExploreButton from "../component/ExploreButton";
import { Header } from "../component/Header";
import { useParams } from "react-router-dom";
// import { useAppSelector } from "../lib/hook";
// import { RootState } from "../lib/store";
import { useGetDataById } from "../hooks/apiCalls";
import Loader from "../component/Loader";
import EmptyPage from "../component/EmptyPage";

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
        <div className="mx-24">
          <Header />
          <Text variant="heading">
            Learn about {params?.id} State, Her MDAs and Political actors
          </Text>
          <Text variant="bodyThree" className="pt-5 pb-12 text-">
            {stateDetailsData?.bio}
          </Text>

          <section className="flex justify-between mx-6 mb-12">
            <div>
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
                value={stateDetailsData?.landMass}
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
            <img src="/lagos.svg" alt="lagos state logo" />
          </section>

          <p className="text-[28px] font-medium">
            Publications by {params?.id} state
          </p>

          <>
            {statePublicationsData?.length < 1 ? (
              <EmptyPage />
            ) : (
              <section className="mt-10 flex flex-wrap justify-between">
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

          <SeeAllPublications />

          <ExploreButton />
        </div>
      )}
    </>
  );
};

export { StateDetails };
