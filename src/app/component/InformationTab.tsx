import React from "react";
import Text from "./Text";

type InformationTabProps = {
  data: {
    id: number;
    name: string;
    number: number;
  }[];
};

const InformationTab = ({ data }: InformationTabProps) => {
  return (
    <div className="flex items-center justify-between px-16 bg-green_300 rounded-lg py-9">
      {data.map(({ id, name, number }) => {
        return (
          <div key={id}>
            <Text className="text-green_200" variant="heading">
              {number}
            </Text>
            <Text variant="caption" className="text-center text-grey_100">
              {name}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default InformationTab;
