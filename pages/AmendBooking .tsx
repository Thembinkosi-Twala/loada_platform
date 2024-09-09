import React, { useState } from "react";
import { useRouter } from "next/router";

const AmendBooking = () => {
    const router = useRouter();
    const [bookingId, setBookingId] = useState("");
    const [newTruckRegistration, setNewTruckRegistration] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Implement amendment logic here
        router.push("/amend-confirmation"); // Redirect to amendment confirmation page
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Amend a Booking</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Booking ID</label>
                    <input
                        type="text"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Truck Registration Number</label>
                    <input
                        type="text"
                        value={newTruckRegistration}
                        onChange={(e) => setNewTruckRegistration(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Amend Booking
                </button>
            </form>
        </div>
    );
};

export default AmendBooking;
