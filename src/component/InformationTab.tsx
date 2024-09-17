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
    <div className="flex items-center justify-between px-8 md:px-16 bg-green_300 rounded-lg py-9">
      {data.map(({ id, name, number, path }) => {
        return (
          <Link
            className={`${
              pathName === path ? "border-b-2 border-green_100 pb-2" : "pb-2"
            }`}
            to={path}
            key={id}
          >
            <Text className="text-green_200" variant="heading">
              {number}
            </Text>
            <Text variant="caption" className="text-center text-grey_100">
              {name}
            </Text>
          </Link>
        );
      })}
    </div>
  );
};

export default InformationTab;
