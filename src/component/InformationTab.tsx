import { Link, useLocation } from "react-router-dom";
import Text from "./Text";

type InformationTabProps = {
  data: {
    id: number;
    name: string;
    number: number;
    path: string;
  }[];
};

const InformationTab = ({ data }: InformationTabProps) => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    // <div className="flex items-center justify-between px-8 md:px-16 bg-green_300 rounded-lg py-9">
    //   {data.map(({ id, name, number, path }) => {
    //     return (
    //       <Link
    //         className={`${
    //           pathName === path ? "border-b-2 border-green_100 pb-2" : "pb-2"
    //         }`}
    //         to={path}
    //         key={id}
    //       >
    //         <Text className="text-green_200" variant="heading">
    //           {number}
    //         </Text>
    //         <Text variant="caption" className="text-center text-grey_100">
    //           {name}
    //         </Text>
    //       </Link>
    //     );
    //   })}
    // </div>

    <div className="flex flex-wrap items-center justify-between gap-8 px-8 md:px-16 bg-green_300 rounded-lg py-9">
      {data.map(({ id, name, number, path }) => (
        <Link
          to={path}
          key={id}
          className={`group flex flex-col items-center text-center transition-all duration-200 ${
            pathName === path
              ? "border-b-2 border-green_100 pb-2"
              : "hover:scale-105 hover:opacity-90"
          }`}
        >
          <Text
            className="text-green_200 text-2xl font-extrabold group-hover:text-green_200"
            variant="heading"
          >
            {number}
          </Text>
          <Text
            variant="caption"
            className="text-grey_100 text-sm mt-1 group-hover:text-green_100"
          >
            {name}
          </Text>
        </Link>
      ))}
    </div>
  );
};

export default InformationTab;
