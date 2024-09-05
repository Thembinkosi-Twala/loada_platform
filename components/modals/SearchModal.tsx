"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import useSearchModal from "@/hooks/useSearchModal";

enum STEPS {
  PICKUP = 0,
  DELIVERY = 1,
  DATE = 2,
  INFO = 3,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.PICKUP);
  const [pickupLocation, setPickupLocation] = useState<CountrySelectValue>();
  const [deliveryLocation, setDeliveryLocation] =
    useState<CountrySelectValue>();
  const [cargoWeight, setCargoWeight] = useState(1);
  const [cargoVolume, setCargoVolume] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [pickupLocation, deliveryLocation]
  );

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      pickupLocation: pickupLocation?.label,
      deliveryLocation: deliveryLocation?.label,
      cargoWeight,
      cargoVolume,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.PICKUP);
    searchModal.onClose();
    router.push(url);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PICKUP) return undefined;

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is the pickup location?"
        subtitle="Specify where your cargo will be picked up."
      />
      <CountrySelect
        value={pickupLocation}
        onChange={(value) => setPickupLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={pickupLocation?.latlng} />
    </div>
  );

  if (step === STEPS.DELIVERY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is the delivery location?"
          subtitle="Specify where your cargo will be delivered."
        />
        <CountrySelect
          value={deliveryLocation}
          onChange={(value) => setDeliveryLocation(value as CountrySelectValue)}
        />
        <hr />
        <Map center={deliveryLocation?.latlng} />
      </div>
    );
  }

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When will your cargo be picked up?"
          subtitle="Specify the dates for pickup and delivery."
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Cargo Information"
          subtitle="Provide additional details about your cargo."
        />
        <Counter
          onChange={(value) => setCargoWeight(value)}
          value={cargoWeight}
          title="Cargo Weight (kg)"
          subtitle="Enter the total weight of the cargo."
        />
        <hr />
        <Counter
          onChange={(value) => setCargoVolume(value)}
          value={cargoVolume}
          title="Cargo Volume (m³)"
          subtitle="Enter the total volume of the cargo."
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title="Cargo Transport | Loada Platform"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.PICKUP ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
