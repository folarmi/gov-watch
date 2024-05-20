import React from "react";

interface Category {
  id: number;
  name: string;
}

interface ScrollableCategoriesProps {
  categories: Category[];
}

const ScrollableCategories: React.FC<ScrollableCategoriesProps> = ({
  categories,
}) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap">
      {categories.map((category) => (
        <span
          key={category.id}
          className="inline-block px-4 py-2 mx-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default ScrollableCategories;
