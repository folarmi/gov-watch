import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import Text from "./Text";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const [imageSrc, setImageSrc] = useState(
    "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1738827704/7313a891-8f32-4678-938c-35f861d09de5.svg"
  );

  const { userObject } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && userObject?.countryImage) {
      setImageSrc(`${userObject.countryImage}?t=${Date.now()}`);
    } else {
      setImageSrc(
        "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1738827704/7313a891-8f32-4678-938c-35f861d09de5.svg"
      );
    }
  }, [isAuthenticated, userObject]);

  return (
    <div className="flex items-center justify-between my-2 md:my-12">
      <div>
        <Text
          variant="heading"
          className="text-black_100 w-[319px] md:w-[908px] pb-3 capitalize"
        >
          Empowering Stakeholders with information and fostering citizen
          participation in governance.
        </Text>
        <div className="flex items-center justify-between ">
          <Text variant="body" className="lg:w-[891px] pb-4 md:pb-0 leading-6">
            GovWatch is on a mission to dismantle the iron law of oligarchy by
            strengthening the cornerstone of civilization: governance. Our goal
            is to champion and safeguard the interests of children, the true
            future of humanity.
          </Text>
        </div>
      </div>

      <img
        key={imageSrc}
        src={imageSrc}
        alt="Country flag"
        className="hidden md:block w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default HeroSection;

// {
//   "publicId": "2394e782-1571-44fa-baf1-ba8019af1dab", - done
//   "image": "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1731721627/3648d681-dda7-425f-9314-e0123338df29.png", - done
//   "category": "Ministry", - done
//   "title": "Consectetur dolor di", - done
//   "content": "Magnam Nam at repell",
//   "date": "16 November 2024", - done
//   "isPromise": true,
//   "isBookmarked": null,
//   "isPromisedFulfilled": null,
//   "datePromiseMade": "1978-11-06T00:00:00", - done
//   "promiseDeadline": "2022-02-06T00:00:00", - done
//   "datePromiseFulfilled": "2007-03-21T00:00:00" - done
// }

// {
//   "article": "Aliquam aute delenit",
//   "submittedBy": "Admin Govwatch",
//   "submittedOn": "15 November 2024",
//   "image": "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1731695711/06e20322-eaeb-477c-aa17-c16caecf999e.png",
//   "imageCaption": "Incididunt adipisci ",
//   "id": "59635381-eb38-4cf2-bc3d-23ad64d5c05c",
//   "title": "Nam esse eaque volup",
//   "isPromise": false,
//   "isPromisedFulfilled": null,
//   "datePromiseMade": "1991-09-19T00:00:00",
//   "promiseDeadline": "1993-02-06T00:00:00",
//   "datePromiseFulfilled": "2002-05-11T00:00:00"
// }

{
  /* <Card
section={section}
articleTitle={title}
summary={summary}
date={date}
promise={isPromise}
imageUrl={image}
deadline={promiseDeadline}
id={id}
isPublished={false}
category={category}
// imageUrl={coatOfArms}
/> */
}
