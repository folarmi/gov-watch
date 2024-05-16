import Image from "next/image";
import smallMap from "../../../public/smallMap.svg";
import Link from "next/link";

const ExploreButton: React.FC = () => {
  return (
    <Link href="/explore" className="fixed bottom-0 right-0 mr-16 mb-4">
      <button className="bg-primary text-base font-extrabold text-white p-5 rounded-[35px] shadow-lg flex items-center ">
        Explore Nigeria
        <Image src={smallMap} alt="a little map" className="ml-2" />
      </button>
    </Link>
  );
};

export default ExploreButton;
