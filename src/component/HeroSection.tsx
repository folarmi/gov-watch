import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import Text from "./Text";

const HeroSection = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  console.log(userObject?.countryImage !== null);

  return (
    <div className="flex items-center justify-between my-2 md:my-12">
      <div>
        <Text
          variant="heading"
          className="text-black_100 w-[319px] md:w-[908px] pb-3"
        >
          Empowering Stakeholders with information and fostering citizen
          participation in governance.
        </Text>
        <div className="flex items-center justify-between ">
          <Text variant="body" className="w-[236px] md:w-[891px] pb-4 md:pb-0">
            GovWatch is on a mission to dismantle the iron law of oligarchy by
            strengthening the cornerstone of civilization: governance. Our goal
            is to champion and safeguard the interests of children, the true
            future of humanity.
          </Text>
        </div>
      </div>

      {userObject?.countryImage !== null ? (
        <img
          src={userObject?.countryImage}
          alt="article thumbnail"
          className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
        />
      ) : (
        // ""
        <img
          className="md:hidden"
          src="/coatOfArms.svg"
          alt="Nigeria coat of arms"
          width={117}
        />
      )}
    </div>
  );
};

export default HeroSection;
