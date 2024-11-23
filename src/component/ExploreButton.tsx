import { Link } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const ExploreButton: React.FC = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  return (
    <Link to="/explore" className="fixed bottom-0 right-0 mr-4 md:mr-16 mb-4">
      <button className="bg-primary text-xs md:text-base font-extrabold text-white p-3 md:p-5 rounded-lg md:rounded-[35px] shadow-lg flex items-center">
        Explore {userObject?.country !== "" ? userObject?.country : "Nigeria"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="white"
        >
          <path d="M8 4l8 8-8 8" />
        </svg>
      </button>
    </Link>
  );
};

export default ExploreButton;
