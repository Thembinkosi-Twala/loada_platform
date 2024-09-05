import React from "react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import { User, Booking, Container } from "@prisma/client"; // Assuming these types are used

import HeartButton from "../HeartButton";
import Menu from "../Menu";
import CustomImage from "../CustomImage";

import { formatPrice } from "@/utils/helper";

interface ListingCardProps {
  data: Container; // Change from Listing to Container
  booking?: Booking; // Change from Reservation to Booking
  onAction?: () => void;
  actionLabel?: string;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  actionLabel,
  onAction,
  booking,
}) => {
  const price = booking ? booking.totalPrice : data?.price; // Adjust property based on data

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    onAction?.();
  };

  let bookingDate;
  if (booking) {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    bookingDate = `${format(start, "PP")} - ${format(end, "PP")}`;
  }

  return (
    <Link href={`/containers/${data.id}`} className="col-span-1 cursor-pointer">
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-[1/0.95] w-full relative overflow-hidden rounded-xl">
          <div className="w-full h-full bg-gray-100 relative">
            <div className="absolute top-0 left-0 p-2 flex items-center justify-between w-full">
              <div className="z-5">
                {onAction && actionLabel && (
                  <Menu>
                    <Menu.Toggle
                      id={actionLabel}
                      className="w-10 h-10 flex items-center z-5 justify-center"
                    >
                      <div className="w-7 h-7 rounded-full bg-neutral-700/50 flex items-center justify-center hover:bg-neutral-700/70 group transition duration-200 z-[5]">
                        <BsThreeDots className="h-[18px] w-[18px] text-gray-300 transition duration-100 group-hover:text-gray-100 " />
                      </div>
                    </Menu.Toggle>

                    <Menu.List>
                      <Menu.Button onClick={handleClick} icon={MdDeleteOutline}>
                        {actionLabel}
                      </Menu.Button>
                    </Menu.List>
                  </Menu>
                )}
              </div>

              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <HeartButton containerId={data.id} currentUser={currentUser} />{" "}
                {/* Changed from listingId to containerId */}
              </div>
            </div>
            <CustomImage imageSrc={data.imageSrc} title={data.title} fill />
          </div>
        </div>
        <span className="font-semibold text-[16px] mt-[4px]">
          {data?.region}, {data?.country}{" "}
          {/* Ensure these fields exist in Container */}
        </span>
        <span className="font-light text-neutral-500 text-sm">
          {bookingDate || data.category}{" "}
          {/* Adjust based on actual Container data */}
        </span>

        <div className="flex flex-row items-baseline gap-1">
          <span className="font-bold text-[#444] text-[14px]">
            R {formatPrice(price)}
          </span>
          {!booking && <span className="font-light">per day</span>}{" "}
          {/* Adjusted from 'night' to 'per day' or as needed */}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
