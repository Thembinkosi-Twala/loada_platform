"use client"; // Ensure this component is client-side
import React, { ReactNode, useEffect, useState } from "react";
import BookingModal from "@/components/modals/BookingModal"; // Import your BookingModal component
import Link from "next/link";

interface BookingData {
    containerNumber: ReactNode;
    containerId: string;
    timeslotId: string;
    referenceNumber: string;
    towerLocation: string;
    truckId: string; // Add referenceNumber to BookingData
}

const Booking = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [containerNumbers, setContainerNumbers] = useState<string[]>([]); // Initialize as empty array
    const [referenceNumber, setReferenceNumber] = useState<string>(""); // State to store the generated reference number
    const [truckIds, setTruckIds] = useState<string[]>([]);
    const [selectedContainerId, setSelectedContainerId] = useState<string>(""); // State for selected container
    const [towerLocation, setLocations] = useState<string[]>([]); // State for locations
    // Function to generate a reference number
    const generateReferenceNumber = (containerNumber: string) => {
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const randomNumbers = Math.floor(1000 + Math.random() * 9000);
        return `B${containerNumber}${date}${randomNumbers}`;
    };

    // Fetch container numbers from the database on component mount
    useEffect(() => {
        const fetchContainerNumbers = async () => {
            try {
                const response = await fetch("/api/booking"); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setContainerNumbers(data); // Assuming the data is an array of container numbers
                if (data.length > 0) {
                    setContainerNumbers(data); // Set the fetched container numbers
                }
            } catch (error) {
                console.error("Failed to fetch container numbers:", error);
            }
        };

        fetchContainerNumbers();
    }, []); // Empty dependency array to run only on mount

    const handleBookingSubmit = (newBooking: BookingData) => {
        setBookings((prev) => [...prev, newBooking]); // Add new booking to the list
        setIsModalOpen(false); // Close the modal after submission
    };

    const handleOpenModal = (containerNumber: string) => {
        const newReferenceNumber = generateReferenceNumber(containerNumber);
        setReferenceNumber(newReferenceNumber); // Set the generated reference number
        setIsModalOpen(true); // Open the modal
    };
    useEffect(() => {
        if (selectedContainerId) {
            const fetchLocations = async () => {
                try {
                    const response = await fetch(`/api/containers/${selectedContainerId}/locations`);
                    const data = await response.json();
                    const locationList = data.map((location: any) => location.name);
                    setLocations(locationList);
                } catch (error) {
                    console.error("Error fetching locations:", error);
                }
            };

            fetchLocations();
        } else {
            setLocations([]);
        }
    }, [selectedContainerId]); // Fetch locations when the selected container changes
    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const response = await fetch("/api/trucks");
                const data = await response.json();
                const truckList = data.map((truck: any) => truck.id);
                setTruckIds(truckList);
            } catch (error) {
                console.error("Error fetching trucks:", error);
            }
        };

        fetchTrucks();
    }, );


    return (
        <div className="flex-grow p-4 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Make a Booking</h2>
            <Link
                href="/"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Back
            </Link>
            &nbsp;
            <button
                onClick={() => handleOpenModal(containerNumbers[0])} // Open modal with the first container number
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Open Booking Form
            </button>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBookingSubmit={(newBooking) => {
                    newBooking.referenceNumber = referenceNumber; // Assign the generated reference number
                    newBooking.containerNumber = setContainerNumbers; // Make sure containerNumber is set
                   
                }}

                containerNumbers={containerNumbers}
            />

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 text-gray-700">
                        <th className="py-2 px-4 border-b">Container Number</th>
                        <th className="py-2 px-4 border-b">Time Slot</th>
                        <th className="py-2 px-4 border-b">Truck Registration</th>
                        <th className="py-2 px-4 border-b">Reference Number</th> {/* Add Reference Number column */}
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{booking.containerNumber}</td>
                            <td className="py-2 px-4 border-b">{booking.timeslotId}</td>
                            <td className="py-2 px-4 border-b">{booking.towerLocation}</td>
                            <td className="py-2 px-4 border-b">{booking.referenceNumber}</td> {/* Display Reference Number */}
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-2 px-4 text-center text-gray-500">No bookings available</td> {/* Update colspan */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Booking;
