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

const FleetManagementPage: React.FC<Props> = ({ category }) => {
  const [fleetData, setFleetData] = useState<string[]>([
    "Truck A - In Service",
    "Truck B - Under Maintenance",
  ]); // Example fleet data
  const [newFleetItem, setNewFleetItem] = useState("");

  const handleAddFleetItem = () => {
    if (newFleetItem) {
      setFleetData([...fleetData, newFleetItem]);
      setNewFleetItem(""); // Clear the input field
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
        <h2 className="text-lg font-semibold">Manage Fleet</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newFleetItem}
            onChange={(e) => setNewFleetItem(e.target.value)}
            placeholder="Enter new fleet item"
            className="p-2 border rounded-lg mr-2"
          />
          <button
            onClick={handleAddFleetItem}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Add Fleet Item
          </button>
        </div>

        <ul className="list-disc ml-5">
          {fleetData.length > 0 ? (
            fleetData.map((item, index) => (
              <li key={index} className="py-1">
                {item}
              </li>
            ))
          ) : (
            <p>No fleet items available.</p>
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

export default FleetManagementPage;
