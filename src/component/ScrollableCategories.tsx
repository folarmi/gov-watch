/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleClick = (categoryName: string) => {
    setSelectedCategory(categoryName); // Update the selected category
    onClick(categoryName); // Call the provided onClick function
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <span
        onClick={() => handleClick("all")}
        className={`inline-block px-4 py-2 mx-2 bg-gray-200 dark:bg-black_100 rounded-lg cursor-pointer ${
          selectedCategory === "all" ? "bg-primary text-white" : "bg-gray-200"
        }`}
      >
        All
      </span>
      {categories.map((category) => (
        <span
          key={category.id}
          onClick={() => handleClick(category.name)}
          className={`inline-block px-4 py-2 mx-2  dark:bg-black_100 rounded-lg cursor-pointer ${
            selectedCategory === category.name
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default ScrollableCategories;
