"use client";
import React from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { getContainers } from "@/actions/getContainers"; // Replace with your actual function
import Skeleton from "react-loading-skeleton";

// Define the type for the container select option
export type ContainerSelectValue = {
  label: string;
  value: string;
  icon: React.ReactNode; // Assuming you have an icon or image for each container type
};

// Props interface for ContainerSelect component
interface ContainerSelectProps {
  value?: ContainerSelectValue;
  onChange: (val: ContainerSelectValue) => void;
}

const ContainerSelect: React.FC<ContainerSelectProps> = ({
  value,
  onChange,
}) => {
  // Fetch containers data
  const { data: containers, isLoading } = useQuery({
    queryFn: getContainers,
    queryKey: ["containers"],
  });

  // Show a loading skeleton while data is being fetched
  if (isLoading) return <Skeleton height={48} width="100%" />;

  return (
    <div>
      <Select
        placeholder="Select a container"
        isClearable
        options={containers}
        value={value}
        onChange={(selectedOption) =>
          onChange(selectedOption as ContainerSelectValue)
        }
        formatOptionLabel={(option: ContainerSelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.icon}</div>
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "p-2 text-sm border",
          input: () => "text-sm",
          option: () => "text-sm",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#000000", // Black
            primary25: "#e0f7fa", // Light cyan for hover
          },
        })}
      />
    </div>
  );
};

export default ContainerSelect;
