import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { categories } from "../../constants"; // Adjust path as necessary

interface Props {
  category: {
    label: string;
    icon: React.ComponentType;
    description: string;
    href: string; // Link to the category page
  } | null;
}

const BookingSlotsPage: React.FC<Props> = ({ category }) => {
  // Placeholder state for booking slots
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      // Simulate fetching booking slots from an API or other data source
      // Replace with real API call in a production environment
      setSlots(["Slot 1", "Slot 2", "Slot 3", "Slot 4"]);
    }
  }, [category]);

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  if (!category) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
        <p>The selected category does not exist or is not available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{category.label}</h1>
      <div className="text-4xl mb-4">
        <category.icon />
      </div>
      <p className="mt-2 mb-4">{category.description}</p>

      <div>
        <h2 className="text-lg font-semibold">Available Booking Slots</h2>
        <ul className="list-disc ml-5">
          {slots.map((slot) => (
            <li key={slot} className="mb-2">
              <button
                className={`p-2 border rounded-lg ${
                  selectedSlot === slot ? "bg-blue-500 text-white" : "bg-white"
                }`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot}
              </button>
            </li>
          ))}
        </ul>
        {selectedSlot && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Selected Slot</h3>
            <p>{selectedSlot}</p>
            {/* Add more details or actions related to the selected slot here */}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query;

  // Ensure category is a string
  if (typeof category !== "string") {
    return {
      props: {
        category: null,
      },
    };
  }

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

export default BookingSlotsPage;
