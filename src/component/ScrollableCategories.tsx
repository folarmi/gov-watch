/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Category {
  id: number;
  name: string;
}

interface ScrollableCategoriesProps {
  categories: Category[];
  onClick: any;
}

const ScrollableCategories: React.FC<ScrollableCategoriesProps> = ({
  categories,
  onClick,
}) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <span
        onClick={() => onClick("all")}
        className="inline-block px-4 py-2 mx-2 bg-gray-200 dark:bg-black_100 rounded-lg cursor-pointer"
      >
        All
      </span>
      {categories.map((category) => (
        <span
          key={category.id}
          onClick={() => onClick(category?.name)}
          className="inline-block px-4 py-2 mx-2 bg-gray-200 dark:bg-black_100 rounded-lg cursor-pointer"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default ScrollableCategories;
