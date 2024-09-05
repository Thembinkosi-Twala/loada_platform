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

const TruckMaintenancePage: React.FC<Props> = ({ category }) => {
  const [maintenanceRecords, setMaintenanceRecords] = useState<string[]>([
    "Oil Change - Truck A - 2023-01-15",
    "Tire Replacement - Truck B - 2023-02-20",
  ]); // Example maintenance records
  const [newRecord, setNewRecord] = useState("");

  const handleAddRecord = () => {
    if (newRecord) {
      setMaintenanceRecords([...maintenanceRecords, newRecord]);
      setNewRecord(""); // Clear the input field
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
        <h2 className="text-lg font-semibold">
          Manage Truck Maintenance Records
        </h2>
        <div className="mb-4">
          <input
            type="text"
            value={newRecord}
            onChange={(e) => setNewRecord(e.target.value)}
            placeholder="Enter new maintenance record"
            className="p-2 border rounded-lg mr-2"
          />
          <button
            onClick={handleAddRecord}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Add Record
          </button>
        </div>

        <ul className="list-disc ml-5">
          {maintenanceRecords.length > 0 ? (
            maintenanceRecords.map((record, index) => (
              <li key={index} className="py-1">
                {record}
              </li>
            ))
          ) : (
            <p>No maintenance records available.</p>
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

export default TruckMaintenancePage;
