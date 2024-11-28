"use client";
import React, { useState, useEffect } from "react";
import AddTruckModal from "@/components/modals/AddTruckModal";
import Link from "next/link";

const TruckManagement = () => {
  const [isAddTruckModalOpen, setIsAddTruckModalOpen] = useState(false);
  const [trucks, setTrucks] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch trucks from the database
  const fetchTrucks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/trucks");

      if (!response.ok) {
        throw new Error("Failed to fetch trucks");
      }

      const data = await response.json();
      setTrucks(data);
    } catch (error: any) {
      console.error("Error fetching trucks:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleOpenModal = () => {
    setIsAddTruckModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddTruckModalOpen(false);         

  };

  const handleAddTruck = async (data: { license: string; make: string; model: string; year: number;tracker:string,status:string}) => {
    // try {
      const response = await fetch("/api/addTrucks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Ensure 'data' contains the required fields
      });

      // if (!response.ok) {
      //   throw new Error("Failed to add truck");
      // }

      const newTruck = await response.json();
      setTrucks((prevTrucks) => [...prevTrucks, newTruck]);
      console.log("Truck added:", newTruck);
    // } catch (error) {
    //   console.error("Error adding truck:", error);
    // }
  };

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
        companyId="Company123"
      />

      <div className="flex-grow p-4 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Registered Trucks</h2>

        {isLoading ? (
          <p className="text-center">Loading trucks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : trucks.length > 0 ? (
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
                {trucks.map((truck, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{truck.license}</td>
                    <td className="border border-gray-300 px-4 py-2">{truck.make}</td>
                    <td className="border border-gray-300 px-4 py-2">{truck.model}</td>
                    <td className="border border-gray-300 px-4 py-2">{truck.year}</td>
                    <td className="border border-gray-300 px-4 py-2">{truck.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No trucks registered.</p>
        )}
      </div>
    </div>
  );
};

export default TruckManagement;
