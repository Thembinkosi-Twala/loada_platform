import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

interface BookingData {
  containerNumber: React.Dispatch<React.SetStateAction<string[]>>;
  containerId: string;
  timeslot: string;
  referenceNumber: string;
  towerLocation: string;
  truckId: string;
  status: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSubmit: (newBooking: BookingData) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<BookingData>();
  const [containerData, setContainerData] = useState<{ id: string; containerNumber: string; location: string }[]>([]);
  const [truckIds, setTruckIds] = useState<string[]>([]);
  const [isContainerLoading, setIsContainerLoading] = useState(true);
  const [isTruckLoading, setIsTruckLoading] = useState(true);

  // Fetch containers and their locations on component mount
  useEffect(() => {
    const fetchContainerData = async () => {
      setIsContainerLoading(true);
      try {
        const response = await fetch("/api/getContainers"); // Adjust endpoint as needed
        const data = await response.json();
        setContainerData(data); // Assuming data is an array of { id, containerNumber, location }
      } catch (error) {
        console.error("Error fetching container data:", error);
      } finally {
        setIsContainerLoading(false);
      }
    };

    fetchContainerData();
  }, []);

  // Fetch trucks on component mount
  useEffect(() => {
    const fetchTruckIds = async () => {
      setIsTruckLoading(true);
      try {
        const response = await fetch("/api/trucks"); // Adjust endpoint as needed
        const data = await response.json();
        setTruckIds(data.map((truck: any) => truck.make)); // Assuming truck objects have `id`
      } catch (error) {
        console.error("Error fetching truck IDs:", error);
      } finally {
        setIsTruckLoading(false);
      }
    };

    fetchTruckIds();
  }, []);

  // Get unique locations for the dropdown
  const uniqueLocations = Array.from(new Set(containerData.map((container) => container.location)));

  const generateReferenceNumber = (containerId: string) => {
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `B${containerId}${date}${randomNumbers}`;
  };

  const onSubmit = async (data: BookingData) => {
    setIsLoading(true);
    const referenceNumber = generateReferenceNumber(data.containerId);
    setValue("referenceNumber", referenceNumber);

    onBookingSubmit({
      ...data,
      referenceNumber,
      status: "PENDING",
    });

    reset();
    setIsLoading(false);
    onClose();
  };

  const bodyContent = (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700">Container Number</label>
        <select
          {...register("containerId", { required: true })}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
          disabled={isContainerLoading}
        >
          <option value="">{isContainerLoading ? "Loading containers..." : "Select a container"}</option>
          {!isContainerLoading &&
            containerData.map((container) => (
              <option key={container.id} value={container.id}>
                {container.containerNumber}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tower Location</label>
        <select
          {...register("towerLocation", { required: true })}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
          disabled={isContainerLoading}
        >
          <option value="">{isContainerLoading ? "Loading locations..." : "Select a location"}</option>
          {!isContainerLoading &&
            uniqueLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Select Time Slot</label>
        <select
         
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">Select a time slot</option>
          <option value="slot1">08:00 AM - 09:00 AM</option>
          <option value="slot2">09:00 AM - 10:00 AM</option>
          <option value="slot3">10:00 AM - 11:00 AM</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Truck ID</label>
        <select
          {...register("truckId", { required: true })}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
          disabled={isTruckLoading}
        >
          <option value="">{isTruckLoading ? "Loading trucks..." : "Select a truck"}</option>
          {!isTruckLoading &&
            truckIds.map((truckId) => (
              <option key={truckId} value={truckId}>
                {truckId}
              </option>
            ))}
        </select>
      </div>
    </form>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Add Booking"
      actionLabel="Add Booking"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default BookingModal;
