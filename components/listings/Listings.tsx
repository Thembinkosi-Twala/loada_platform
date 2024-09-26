"use client";
import React, { FC } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import { categories } from "@/constants"; // Adjust path as necessary
import HelpdeskButton from "@/components/HelpdeskButton";

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

    <div className="flex-grow p-4 mb-4">
      <div className="flex justify-between mb-4">
        <div>
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
          <div className="text-end">
            <HelpdeskButton />
          </div>
        ) : (
          <p>join us</p>
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

        <div>
          <h2 className="text-center font-bold text-xl mb-4">
            The Loada Platform
          </h2>

          {/* About Us Section */}
          <section className="mb-6 text-center">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm text-gray-600">
              Loada is a platform designed to streamline cargo management,
              booking, and tracking for logistics companies and fleet operators.
              Our mission is to provide an efficient and user-friendly platform
              for managing all aspects of cargo operations.
            </p>
          </section>
          {/* Contact Us Section */}
          <section className="text-center">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-gray-600">
              Have questions or need assistance? Reach out to us at:{" "}
              <a
                href="mailto:support@loada.com"
                className="text-blue-500 hover:underline"
              >
                support@loada.com
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <HelpdeskButton />
            </p>
          </section>
        </div>
      )}

    </div>
  );
};

export default Listings;
