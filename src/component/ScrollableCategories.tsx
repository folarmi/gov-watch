import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface ScrollableCategoriesProps {
  categories: Category[];
  onClick: (categoryName: string) => void;
  isLoading?: boolean;
}

const ScrollableCategories: React.FC<ScrollableCategoriesProps> = ({
  categories,
  onClick,
  isLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleClick = (categoryName: string) => {
    if (isLoading) return;
    setSelectedCategory(categoryName); // Update the selected category
    onClick(categoryName); // Call the provided onClick function
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <span
        onClick={() => handleClick("all")}
        className={`inline-block px-4 py-2 mx-2 bg-gray-200 dark:bg-black_100 rounded-lg cursor-pointer ${
          selectedCategory === "all" ? "bg-primary text-white" : "bg-gray-200"
        }${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        All
      </span>
      {categories?.map((category) => (
        <span
          key={category.id}
          onClick={() => handleClick(category.name)}
          className={`inline-block px-4 py-2 mx-2  dark:bg-black_100 rounded-lg cursor-pointer ${
            selectedCategory === category.name
              ? "bg-primary text-white"
              : "bg-gray-200"
          }${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default ScrollableCategories;
