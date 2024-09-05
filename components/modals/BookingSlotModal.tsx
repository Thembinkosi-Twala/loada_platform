"use client";
import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "./Modal";
import Heading from "../Heading";
import ContainerSelect from "../inputs/ContainerSelect";
import DatePicker from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";

import useBookingModal from "@/hooks/useBookingModal";
import { containers } from "@/constants"; // Assuming this is a list of containers
import { Container } from "@/types"; // Assuming this is the type for containers

enum STEPS {
  CONTAINER = 0,
  DATE = 1,
  INFO = 2,
  QUANTITY = 3,
}

const BookingSlotModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bookingModal = useBookingModal();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(STEPS.CONTAINER);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      container: "",
      pickupDate: new Date(),
      quantity: 1,
      specialInstructions: "",
    },
  });
  const router = useRouter();

  const container = watch("container");
  const pickupDate = watch("pickupDate");
  const quantity = watch("quantity");
  const specialInstructions = watch("specialInstructions");

  const ContainerMap = useMemo(
    () =>
      dynamic(() => import("../ContainerMap"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [container]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

 const onSubmit: SubmitHandler<FieldValues> = (data) => {
   if (step !== STEPS.QUANTITY) return onNext();
   setIsLoading(true);

   // Ensure container is correctly passed in the data
   const bookingData = {
     container: data.container,
     pickupDate: data.pickupDate,
     quantity: data.quantity,
     specialInstructions: data.specialInstructions,
   };

   axios
     .post("/api/bookings", bookingData)
     .then(() => {
       toast.success("Booking confirmed!");
       queryClient.invalidateQueries({ queryKey: ["bookings"] });
       reset();
       setStep(STEPS.CONTAINER);
       bookingModal.onClose();
     })
     .catch(() => {
       toast.error("Something went wrong!");
     })
     .finally(() => {
       setIsLoading(false);
     });
 };


  const actionLabel = useMemo(() => {
    if (step === STEPS.QUANTITY) {
      return "Confirm";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CONTAINER) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading
        title="Select Container Type"
        subtitle="Choose the container you need"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[210px] overflow-y-auto">
        {containers && containers.length > 0 ? (
          containers.map((item: Container) => (
            <div key={item.label} className="col-span-1">
              <ContainerSelect
                onClick={() => setCustomValue("container", item.value)}
                selected={container === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))
        ) : (
          <div>No containers available</div>
        )}
      </div>
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Select Pickup Date"
          subtitle="When do you need the container?"
        />
        <DatePicker
          selectedDate={pickupDate}
          onChange={(date: any) => setCustomValue("pickupDate", date)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Additional Information"
          subtitle="Provide any special instructions"
        />
        <Input
          id="specialInstructions"
          label="Special Instructions"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.QUANTITY) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="How many containers do you need?"
          subtitle="Set the quantity"
        />
        <Counter
          title="Quantity"
          subtitle="How many containers are needed?"
          value={quantity}
          onChange={(value) => setCustomValue("quantity", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={bookingModal.isOpen}
      title="Loada || Booking Slot"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CONTAINER ? undefined : onBack}
      onClose={bookingModal.onClose}
      body={bodyContent}
    />
  );
};

export default BookingSlotModal;
