import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { categories } from "../../constants"; // Adjust path as necessary

interface Props {
  category: {
    label: string;
    icon: React.ComponentType;
    description: string;
  };
}

const DeliveryDronesPage: React.FC<Props> = ({ category }) => {
  const [drones, setDrones] = useState<string[]>([
    "Drone A - Active",
    "Drone B - Under Maintenance",
  ]); // Example drone data
  const [newDrone, setNewDrone] = useState("");

  const handleAddDrone = () => {
    if (newDrone) {
      setDrones([...drones, newDrone]);
      setNewDrone(""); // Clear the input field
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{category.label}</h1>
      <div className="text-4xl mb-4">
        <category.icon />
      </div>
      <p className="mt-2">{category.description}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Manage Delivery Drones</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newDrone}
            onChange={(e) => setNewDrone(e.target.value)}
            placeholder="Enter new drone details"
            className="p-2 border rounded-lg mr-2"
          />
          <button
            onClick={handleAddDrone}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Add Drone
          </button>
        </div>

        <ul className="list-disc ml-5">
          {drones.length > 0 ? (
            drones.map((drone, index) => (
              <li key={index} className="py-1">
                {drone}
              </li>
            ))
          ) : (
            <p>No drones available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query;

  // Find the category data based on the route parameter
  const selectedCategory = categories.find(
    (cat) => cat.label.toLowerCase().replace(/\s+/g, "-") === category
  );

  return {
    props: {
      category: selectedCategory || null,
    },
  };
};

export default DeliveryDronesPage;
