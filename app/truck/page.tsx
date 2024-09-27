// TruckManagement.tsx
"use client";
import React, { useState } from "react";
import AddTruckModal from "@/components/modals/AddTruckModal";
import Link from "next/link";

const TruckManagement = () => {
    const [isAddTruckModalOpen, setIsAddTruckModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsAddTruckModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddTruckModalOpen(false);
    };

    const handleAddTruck = (truckData: { licensePlate: string; make: string; model: string; year: number }) => {
        // Logic to handle adding the truck goes here
        console.log("Truck added:", truckData);
    };
    const trucks = [
        { licensePlate: 'ABC123', make: 'Ford', model: 'F-150', year: 2020, status: 'Available' },
        { licensePlate: 'XYZ456', make: 'Chevrolet', model: 'Silverado', year: 2021, status: 'In Transit' },
        // Add more truck objects as needed
    ];

    return (
        <div className="flex-grow p-4 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Manage Trucks</h2>
            <Link
                href="/"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Back
            </Link>
            &nbsp;
            <button
                onClick={handleOpenModal}
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mb-4"
            >
                Add Truck
            </button>

            <AddTruckModal
                isOpen={isAddTruckModalOpen}
                onClose={handleCloseModal}
                onAddTruck={handleAddTruck}
            />

            {/* Additional UI elements to manage trucks could be placed here */}
            <div className="flex-grow p-4 mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Registered Trucks</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">License Plate</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Make</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Model</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trucks.length > 0 ? (
                                trucks.map((truck, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{truck.licensePlate}</td>
                                        <td className="border border-gray-300 px-4 py-2">{truck.make}</td>
                                        <td className="border border-gray-300 px-4 py-2">{truck.model}</td>
                                        <td className="border border-gray-300 px-4 py-2">{truck.year}</td>
                                        <td className="border border-gray-300 px-4 py-2">{truck.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">No trucks registered</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        

    );
};

export default TruckManagement;
