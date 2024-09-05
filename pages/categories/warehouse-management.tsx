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

const WarehouseManagementPage: React.FC<Props> = ({ category }) => {
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2", "Item 3"]); // Example item data
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem) {
      setItems([...items, newItem]);
      setNewItem(""); // Clear the input field
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
        <h2 className="text-lg font-semibold">Manage Warehouse Items</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter new item name"
            className="p-2 border rounded-lg mr-2"
          />
          <button
            onClick={handleAddItem}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Add Item
          </button>
        </div>

        <ul className="list-disc ml-5">
          {items.length > 0 ? (
            items.map((item, index) => (
              <li key={index} className="py-1">
                {item}
              </li>
            ))
          ) : (
            <p>No items available in the warehouse.</p>
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

export default WarehouseManagementPage;
