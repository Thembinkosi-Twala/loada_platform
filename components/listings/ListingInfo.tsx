import React from "react";
import dynamic from "next/dynamic";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { Category } from "@/types";
import { User } from "@prisma/client";

interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number; // Adjust these if they don't fit cargo management context
  roomCount: number; // Adjust these if they don't fit cargo management context
  bathroomCount: number; // Adjust these if they don't fit cargo management context
  category?: Category; // Category might be replaced with cargo type or category
  latlng: number[]; // Coordinates for location on map
}

const Map = dynamic(() => import("./../Map"), {
  ssr: false,
});

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount, // Consider renaming if not used in cargo context
  roomCount, // Consider renaming if not used in cargo context
  bathroomCount, // Consider renaming if not used in cargo context
  category,
  latlng,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-[16px] font-semibold flex flex-row items-center gap-2">
          <span className="mr-1">Managed by</span>
          <Avatar src={user?.image} />
          <span> {user?.name}</span>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-700">
          <span>{guestCount} containers</span> {/* Adjusted label */}
          <span>{roomCount} shipments</span> {/* Adjusted label */}
          <span>{bathroomCount} pickups</span> {/* Adjusted label */}
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description || ""}
        />
      )}
      <hr />
      <p className="font-light text-neutral-500 text-[16px]">{description}</p>
      <hr />
      <Map center={latlng} />
    </div>
  );
};

export default ListingInfo;
