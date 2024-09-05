"use client";
import React, { useState, useEffect } from "react";

// Mock function to simulate real-time updates (In actual implementation, use WebSockets or a similar method)
const getRealTimeUpdates = () => {
  return [
    {
      id: 1,
      name: "Container A",
      status: "Available",
      slot: "Slot 1",
      tracking: true,
    },
    {
      id: 2,
      name: "Container B",
      status: "In Use",
      slot: "Slot 2",
      tracking: false,
    },
    {
      id: 3,
      name: "Container C",
      status: "Delayed",
      slot: "Slot 3",
      tracking: true,
    },
  ];
};

const ContainerManagement = () => {
  const [containers, setContainers] = useState<any[]>([]);
  const [newContainerName, setNewContainerName] = useState("");
  const [newContainerStatus, setNewContainerStatus] = useState("");
  const [availableSlots, setAvailableSlots] = useState([
    "Slot 1",
    "Slot 2",
    "Slot 3",
  ]);
  const [newSlot, setNewSlot] = useState("");

  useEffect(() => {
    // Fetch real-time updates every 5 seconds
    const interval = setInterval(() => {
      try {
        const updates = getRealTimeUpdates();
        setContainers(updates);
      } catch (error) {
        console.error("Failed to fetch real-time updates", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAddContainer = (e: React.FormEvent) => {
    e.preventDefault();
    const newContainer = {
      id: Date.now(), // Generate a unique ID based on the current time
      name: newContainerName,
      status: newContainerStatus,
      slot: newSlot,
      tracking: false,
    };

    setContainers((prevContainers) => [...prevContainers, newContainer]);
    setNewContainerName("");
    setNewContainerStatus("");
    setNewSlot("");
  };

  const handleReallocateSlot = (containerId: number) => {
    const updatedContainers = containers.map((container) =>
      container.id === containerId
        ? { ...container, slot: "Reallocated Slot", status: "Reallocated" }
        : container
    );
    setContainers(updatedContainers);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Container Management</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Real-Time Container Updates
        </h2>
        <ul className="list-disc ml-5">
          {containers.length > 0 ? (
            containers.map((container) => (
              <li key={container.id}>
                <strong>{container.name}</strong> - {container.status}
                {container.slot && ` (Slot: ${container.slot})`}
                {container.tracking && " - Tracking Enabled"}
                {container.status === "Delayed" && (
                  <button
                    className="ml-4 text-sm text-blue-500"
                    onClick={() => handleReallocateSlot(container.id)}
                  >
                    Reallocate Slot
                  </button>
                )}
              </li>
            ))
          ) : (
            <p>No containers available.</p>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Add New Container</h2>
        <form onSubmit={handleAddContainer} className="space-y-4">
          <div>
            <label
              htmlFor="containerName"
              className="block text-sm font-medium"
            >
              Container Name
            </label>
            <input
              type="text"
              id="containerName"
              className="border rounded-lg w-full p-2"
              value={newContainerName}
              onChange={(e) => setNewContainerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="containerStatus"
              className="block text-sm font-medium"
            >
              Status
            </label>
            <select
              id="containerStatus"
              className="border rounded-lg w-full p-2"
              value={newContainerStatus}
              onChange={(e) => setNewContainerStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Delayed">Delayed</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label htmlFor="slot" className="block text-sm font-medium">
              Slot Allocation
            </label>
            <select
              id="slot"
              className="border rounded-lg w-full p-2"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              required
            >
              <option value="">Select Slot</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Container
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContainerManagement;
