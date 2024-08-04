import React from "react";
import defaultAvatar from "../../../../../public/defaultAvatar.svg";
import Image from "next/image";
import Text from "@/app/component/Text";

const SingleInbox = () => {
  return (
    <div className="mt-10">
      {/* <Image src={backArrow} alt="back arrow" /> */}
      <Text variant="subheading" className="py-4 uppercase">
        I want to understand why my publication was denied
      </Text>

      <div className="flex items-center">
        {/* <Text className="text-sm font-semibold">From</Text> */}
        <Image src={defaultAvatar} alt="back arrow" className="mx-3" />
        <div className="">
          <Text className="text-sm font-normal">Jane Doe</Text>
          <Text className="text-sm font-semibold">Contributor</Text>
        </div>
      </div>

      <Text variant="body" className="py-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas porro
        ipsa vero ad, quisquam vel cum harum modi. Ad aperiam expedita
        architecto, numquam laudantium consectetur nihil eaque ab, maxime
        molestiae labore est repudiandae possimus doloribus! Iure fuga molestias
        eveniet! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        esse adipisci nesciunt. Similique ab id itaque voluptate consequuntur.
        Voluptatum, officia?
      </Text>

      <Text variant="body" className="pb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas porro
        ipsa vero ad, quisquam vel cum harum modi. Ad aperiam expedita
        architecto, numquam laudantium consectetur nihil eaque ab, maxime
        molestiae labore est repudiandae possimus doloribus! Iure fuga molestias
        eveniet! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        esse adipisci nesciunt. Similique ab id itaque voluptate consequuntur.
        Voluptatum, officia?
      </Text>

      <Text variant="body" className="pb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas porro
        ipsa vero ad, quisquam vel cum harum modi. Ad aperiam expedita
        architecto, numquam laudantium consectetur nihil eaque ab, maxime
        molestiae labore est repudiandae possimus doloribus! Iure fuga molestias
        eveniet! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        esse adipisci nesciunt. Similique ab id itaque voluptate consequuntur.
        Voluptatum, officia?
      </Text>
      <Text variant="body" className="pb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas porro
        ipsa vero ad, quisquam vel cum harum modi. Ad aperiam expedita
        architecto, numquam laudantium consectetur nihil eaque ab, maxime
        molestiae labore est repudiandae possimus doloribus! Iure fuga molestias
        eveniet! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        esse adipisci nesciunt. Similique ab id itaque voluptate consequuntur.
        Voluptatum, officia?
      </Text>
    </div>
  );
};

export default SingleInbox;
