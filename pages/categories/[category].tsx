import { useRouter } from "next/router";
import { categories } from "../../constants"; // Adjust path as necessary
import React from "react";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  // Ensure category is a string before using it
  const categoryString = typeof category === "string" ? category : "";

  const selectedCategory = categories.find(
    (cat) => cat.label.toLowerCase().replace(/\s+/g, "-") === categoryString
  );

  if (!selectedCategory) {
    return <div className="p-4">Category not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{selectedCategory.label}</h1>
      <p className="mt-2 text-lg">{selectedCategory.description}</p>
      {/* Add further details or components specific to the category here */}
    </div>
  );
};

export default CategoryPage;
