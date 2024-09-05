import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType; // Type for the icon component
  label: string; // Category label
  description: string; // Category description
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon, // Renamed icon to Icon
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />{" "}
        {/* Render the icon with size 40 and a color */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{label}</span>{" "}
          {/* Category label with larger font size and bold styling */}
          <p className="text-neutral-500 font-light">{description}</p>{" "}
          {/* Description with lighter font weight */}
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
