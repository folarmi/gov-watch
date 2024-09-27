import { Link } from "react-router-dom";

const ExploreButton: React.FC = () => {
  return (
    <Link to="/explore" className="fixed bottom-0 right-0 mr-4 md:mr-16 mb-4">
      <button className="bg-primary text-xs md:text-base font-extrabold text-white p-3 md:p-5 rounded-lg md:rounded-[35px] shadow-lg flex items-center">
        Explore Nigeria
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
