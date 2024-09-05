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

const ShippingPage: React.FC<Props> = ({ category }) => {
  const [schedules, setSchedules] = useState<string[]>([
    "Shipment A - Destination X - 2023-09-15",
    "Shipment B - Destination Y - 2023-10-01",
  ]); // Example shipping schedules
  const [newSchedule, setNewSchedule] = useState("");

  const handleAddSchedule = () => {
    if (newSchedule) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule(""); // Clear the input field
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
        <h2 className="text-lg font-semibold">Manage Shipping Schedules</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newSchedule}
            onChange={(e) => setNewSchedule(e.target.value)}
            placeholder="Enter new shipping schedule"
            className="p-2 border rounded-lg mr-2"
          />
          <button
            onClick={handleAddSchedule}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Add Schedule
          </button>
        </div>

        <ul className="list-disc ml-5">
          {schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <li key={index} className="py-1">
                {schedule}
              </li>
            ))
          ) : (
            <p>No shipping schedules available.</p>
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

export default ShippingPage;
