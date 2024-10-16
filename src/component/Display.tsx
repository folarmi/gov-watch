/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";
import Card from "./Card";
import EmptyPage from "./EmptyPage";
import Loader from "./Loader";
import { Article } from "../types/generalTypes";

type Prop = {
  loadingState: boolean;
  moduleData: Article[];
};

const Display = ({ loadingState, moduleData }: Prop) => {
  return (
    <div className="">
      {loadingState ? (
        <Loader />
      ) : (
        <>
          {moduleData?.length < 1 ? (
            <EmptyPage />
          ) : (
            <div className="flex flex-wrap justify-between">
              {moduleData?.map(
                ({
                  title,
                  date,
                  image,
                  section,
                  summary,
                  isPromise,
                  id,
                  publicId,
                  promiseDeadline,
                }: any) => {
                  return (
                    <Link
                      to={`/dashboard/pending/${id || publicId}`}
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
                        id={id}
                        // imageUrl={coatOfArms}
                      />
                    </Link>
                  );
                }
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Display;
