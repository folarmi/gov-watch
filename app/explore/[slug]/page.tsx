import TextAndValue from "../../component/StateDetail";
import Text from "../../component/Text";
import lagosLogo from "../../../../public/lagos.svg";
import arrow from "../../../../public/arrow.svg";
import Image from "next/image";
import { cardData } from "../../data";
import Card from "../../component/Card";
import ExploreButton from "../../component/ExploreButton";
import SeeAllPublications from "@/app/component/SeeAllPublications";

const StateDetails = () => {
  return (
    <div className="mx-24">
      <Text variant="heading">
        Learn about Lagos State, Her MDAs and Political actors
      </Text>
      <Text variant="bodyThree" className="pt-5 pb-12 text-">
        Lagos is a major African financial centre and is the economic hub of
        Lagos State and Nigeria at large.
      </Text>

      <section className="flex justify-between mx-6 mb-12">
        <div>
          <TextAndValue title="Capital" value="Ikeja" />
          <TextAndValue title="Governor" value="Babajide Sanwo-Olu" />
          <TextAndValue
            title="Political Party"
            value="All Progressive Congress (APC)"
          />
          <TextAndValue title="Population" value="16,536,018" />
          <TextAndValue title="Land Mass" value="3,577 km²" />
          <TextAndValue title="Land Mass" value="246 trillion at 2023" />
          <TextAndValue title="MDAs" value="82" />
          <TextAndValue title="LGA" value="20" />
        </div>
        <Image src={lagosLogo} alt="lagos state logo" />
      </section>

      <p className="text-[28px] font-medium">Publications by Lagos state</p>
      <section className="mt-10 flex flex-wrap justify-between">
        {cardData.map(
          ({ articleTitle, date, imageUrl, section, summary, promise }) => {
            return (
              <div
                key={articleTitle}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
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

      <SeeAllPublications />

      <ExploreButton />
    </div>
  );
};

export default StateDetails;
