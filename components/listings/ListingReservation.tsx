import React from "react";
import { Range } from "react-date-range";

import Calendar from "../inputs/Calendar";
import Button from "../Button";
import SpinnerMini from "../loader/Loader";

import { formatPrice } from "@/utils/helper";

interface CargoReservationProps {
  pricePerUnit: number; // Price per unit of cargo or service
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disabledDates: Date[];
}

const CargoReservation: React.FC<CargoReservationProps> = ({
  pricePerUnit,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-lg font-semibold">
          R {formatPrice(pricePerUnit)}
        </span>
        <span className="font-light text-neutral-600">per unit</span>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={isLoading}
          onClick={onSubmit}
          className="flex flex-row items-center justify-center h-[42px]"
        >
          {isLoading ? <SpinnerMini /> : <span>Book Cargo</span>}
        </Button>
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <span>Total</span>
        <span>R {formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default CargoReservation;
