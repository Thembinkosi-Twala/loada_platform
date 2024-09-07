"use client";
import React, { FC } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import { categories } from "../../constants"; // Adjust path as necessary

interface ListingsProps {
  currentUser: User | null;
}

const Listings: FC<ListingsProps> = ({ currentUser }) => {
  // Check if the current user is an admin
  const isAdmin = currentUser?.isAdmin || false;

  // Filter categories based on admin status
  const filteredCategories = categories.filter(
    (category) => !category.adminOnly || (category.adminOnly && isAdmin)
  );
  return (
    <div className="flex-grow p-4">
      <div className="mb-4">
        {/* <h1 className="text-2xl font-bold mb-2">Dashboard</h1> */}
        {currentUser ? (
          <div className="flex items-center space-x-2">
            <p className="text-lg font-medium">Welcome,</p>
            <span className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-full">
              {currentUser.name}
            </span>
          </div>
        ) : (
          <p className="text-center">Please log in to access the dashboard.</p>
        )}
      </div>
      {currentUser ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <Link href={category.href} key={category.label}>
              <button className="flex items-center w-full h-32 p-4 border rounded-lg shadow hover:bg-gray-100 transition">
                <category.icon className="text-3xl mr-4" />
                <div className="flex flex-col justify-center">
                  <h2 className="text-lg font-semibold">{category.label}</h2>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
              </button>
            </Link>
          ))}
        </div>
      ) : (
         <p className="text-center font-bold">
            The Loada Platform
          </p>
      )}
    </div>
  );
};

export default Listings;
