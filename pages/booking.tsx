import React, { useState } from "react";
import { useRouter } from "next/router";

const Booking = () => {
  const router = useRouter();
  const [containerNumber, setContainerNumber] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [truckRegistration, setTruckRegistration] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [tower, setTower] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Implement booking logic and handle responses here
    router.push("/booking-confirmation"); // Redirect to booking confirmation page
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Make a Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Container Number</label>
          <input
            type="text"
            value={containerNumber}
            onChange={(e) => setContainerNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Select Time Slot</label>
          <input
            type="datetime-local"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Truck Registration Number</label>
          <input
            type="text"
            value={truckRegistration}
            onChange={(e) => setTruckRegistration(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Make Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
