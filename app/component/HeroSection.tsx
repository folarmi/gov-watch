import React from "react";
import Text from "./Text";
import coatOfArms from "../../public/coatOfArms.svg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-between my-2 md:my-12">
      <div>
        <Text
          variant="heading"
          className="text-black_100 w-[319px] md:w-[908px] pb-3"
        >
          Empowering Nigerians with information and fostering citizen
          participation in governance.
        </Text>
        <div className="flex items-center justify-between">
          <Text variant="body" className="w-[236px] md:w-[891px] pb-4 md:pb-0">
            Lorem ipsum dolor sit amet consectetur. Neque eu velit diam vel
            venenatis cras. Tincidunt curabitur quis praesent aliquet lectus
            neque. Varius et scelerisque faucibus id convallis gravida. Sed
            egestas vitae elit arcu amet facilisi ridiculus{" "}
          </Text>

          <Image
            className="md:hidden"
            src={coatOfArms}
            alt="Nigeria coat of arms"
            width={117}
          />
        </div>
      </div>

      <Image
        className="hidden md:block"
        src={coatOfArms}
        alt="Nigeria coat of arms"
      />
    </div>
  );
};

export default HeroSection;
