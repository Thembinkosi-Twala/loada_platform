"use client";
import React from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { getContainers } from "@/actions/getContainers"; // Ensure this path is correct
import Skeleton from "react-loading-skeleton";

// Define the type for the container select option
export type ContainerSelectValue = {
  label: string;
  value: string;
  icon: React.ReactNode; // Assuming you have an icon or image for each container type
};

interface ContainerSelectProps {
  onClick: () => void;
  selected: boolean;
  label: string;
  icon: React.ReactNode;
}

const ContainerSelect: React.FC<ContainerSelectProps> = ({
  onClick,
  selected,
  label,
  icon,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-2 rounded-md cursor-pointer ${
        selected ? "border-black" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <div>{icon}</div>
        <div>{label}</div>
      </div>
    </div>
  );
};

export default ContainerSelect;
