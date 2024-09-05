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

const TruckManagementPage: React.FC<Props> = ({ category }) => {
  const [trucks, setTrucks] = useState<string[]>([
    "Truck 1",
    "Truck 2",
    "Truck 3",
  ]); // Example truck data
  const [newTruck, setNewTruck] = useState("");

  const handleAddTruck = () => {
    if (newTruck) {
      setTrucks([...trucks, newTruck]);
      setNewTruck(""); // Clear the input field
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
        <h2 className="text-lg font-semibold">Manage Trucks</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newTruck}
            onChange={(e) => setNewTruck(e.target.value)}
            placeholder="Enter new truck name"
            className="p-2 border rounded-lg mr-2"
          />
          <button
            onClick={handleAddTruck}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Add Truck
          </button>
        </div>

        <ul className="list-disc ml-5">
          {trucks.length > 0 ? (
            trucks.map((truck, index) => (
              <li key={index} className="py-1">
                {truck}
              </li>
            ))
          ) : (
            <p>No trucks available.</p>
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

export default TruckManagementPage;
