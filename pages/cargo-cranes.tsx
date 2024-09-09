import React from "react";
import { GetServerSideProps } from "next";
import { categories } from "../constants"; // Adjust path as necessary

interface Props {
  category: {
    label: string;
    icon: React.ComponentType;
    description: string;
  } | null;
}

const CargoCranesPage: React.FC<Props> = ({ category }) => {
  if (!category) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
        <p className="mt-2">The requested category does not exist.</p>
      </div>
    );
  }

  const { label, icon: Icon, description } = category;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{label}</h1>
      <div className="text-4xl">
        <Icon />
      </div>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query;

  // Find the category data based on the route parameter
  const selectedCategory =
    categories.find(
      (cat) => cat.label.toLowerCase().replace(/\s+/g, "-") === category
    ) || null;

  return {
    props: {
      category: selectedCategory,
    },
  };
};

export default CargoCranesPage;
