import React, { useState } from "react";
import { useRouter } from "next/router";

const TruckManagement = () => {
  const router = useRouter();
  const [licensePlate, setLicensePlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const handleAddTruck = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Implement API call to add truck
    // Example: await api.addTruck({ licensePlate, make, model, year });
    router.push("/dashboard"); // Redirect to dashboard or another page
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Trucks</h2>
      <form onSubmit={handleAddTruck}>
        <div className="mb-4">
          <label className="block text-gray-700">License Plate</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Make</label>
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Truck
        </button>
      </form>
    </div>
  );
};

export default TruckManagement;
