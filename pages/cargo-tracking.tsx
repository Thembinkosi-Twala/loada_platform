import React, { useState } from "react";

const CargoTracking = () => {
  const [containerNumber, setContainerNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState("");

  const handleTrack = async () => {
    // Implement tracking logic here
    setTrackingInfo("Tracking information here"); // Set tracking info from the response
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Track My Cargo</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Container Number</label>
        <input
          type="text"
          value={containerNumber}
          onChange={(e) => setContainerNumber(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleTrack}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Track Cargo
      </button>
      {trackingInfo && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Tracking Information</h3>
          <p>{trackingInfo}</p>
        </div>
      )}
    </div>
  );
};

export default CargoTracking;
