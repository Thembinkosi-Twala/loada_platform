import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Import the Modal component
import { useForm } from "react-hook-form"; // Assuming you're using react-hook-form

// Define the structure for booking data
interface BookingData {
    BookingData(BookingData: any): unknown;
    containerId: string;
    timeslotId: string;
    referenceNumber: string;
    towerLocation: string;
    truckId: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBookingSubmit: (newBooking: BookingData) => void;
    containerNumbers: string[];
}

const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    onBookingSubmit,
    containerNumbers,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm<BookingData>();
    const [truckIds, setTruckIds] = useState<string[]>([]);
    const [selectedContainerId, setSelectedContainerId] = useState<string>(""); // State for selected container
    const [locations, setLocations] = useState<string[]>([]); // State for locations

    

    const generateReferenceNumber = (containerNumber: string) => {
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const randomNumbers = Math.floor(1000 + Math.random() * 9000);
        return `B${containerNumber}${date}${randomNumbers}`;
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700">Container Number</label>
                <select
                    {...register("containerId", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    onChange={(e) => setSelectedContainerId(e.target.value)} // Update selected container
                >
                    <option value="">Select a container</option>
                    {containerNumbers.map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Select Time Slot</label>
                <select
                    {...register("timeslotId", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                >
                    <option value="">Select a time slot</option>
                    {/* Hardcoded time slots */}
                    <option value="slot1">08:00 AM - 09:00 AM</option>
                    <option value="slot2">09:00 AM - 10:00 AM</option>
                    <option value="slot3">10:00 AM - 11:00 AM</option>
                    <option value="slot4">11:00 AM - 12:00 PM</option>
                    <option value="slot5">01:00 PM - 02:00 PM</option>
                    <option value="slot6">02:00 PM - 03:00 PM</option>
                    <option value="slot7">03:00 PM - 04:00 PM</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Reference Number</label>
                <input
                    type="text"
                    {...register("referenceNumber")}
                    readOnly
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Generated reference number will appear here"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tower Location</label>
                <select
                    {...register("towerLocation", { required: true })} // Updated to use `towerLocation`
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Truck ID</label>
                <select
                    {...register("truckId", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                >
                    <option value="">Select a truck</option>
                    {truckIds.map((truck) => (
                        <option key={truck} value={truck}>
                            {truck}
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
