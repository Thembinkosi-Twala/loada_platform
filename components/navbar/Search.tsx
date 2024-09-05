"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import useSearchModal from "@/hooks/useSearchModal";
import { getCountry } from "@/actions/getCountryBylabel";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const pickupLocation = params?.get("pickupLocation");
  const deliveryLocation = params?.get("deliveryLocation");

  const { data, isLoading } = useQuery({
    queryFn: () => getCountry(pickupLocation ?? ""),
    queryKey: [`label:${pickupLocation}`],
  });

  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const cargoWeight = params?.get("cargoWeight");

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any duration";
  }, [endDate, startDate]);

  const weightLabel = cargoWeight ? `${cargoWeight} kg Cargo` : "Add Cargo";

  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-bold px-6 text-[#585858]">
          {isLoading ? (
            <Skeleton width={120} height={18} borderRadius={4} />
          ) : data ? (
            data.label
          ) : (
            "Loada Platform"
          )}
        </div>
        <div className="hidden sm:block text-sm font-bold px-6 border-x-[1px] flex-1 text-center text-[#585858]">
          {durationLabel}
        </div>

        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-4">
          <div className="hidden sm:block font-normal">{weightLabel}</div>
          <div
            className="
              p-2 
              bg-teal-600 
              rounded-full 
              text-white
            "
          >
            <FaSearch className="text-[12px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
