"use client";
import React, { FC } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import { categories } from "../../constants"; // Adjust path as necessary

interface ListingsProps {
  currentUser: User | null;
}

const Listings: FC<ListingsProps> = ({ currentUser }) => {
  // Authentication state
  if (!currentUser) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Categories Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link href={`/${category.label.toLowerCase().replace(/\s/g, "-")}`} key={category.label}>
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
      </div>
    );
  }

  // return (
  //   <div className="container mx-auto p-4">
  //     <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

  //     {/* Categories Navigation */}
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //       {categories.map((category) => (
  //         <Link
  //           href={`/${category.label.toLowerCase().replace(/\s/g, "-")}`}
  //           key={category.label}
  //         >
  //           <a className="flex items-center p-4 border rounded-lg shadow hover:bg-gray-100 transition">
  //             <category.icon className="text-3xl mr-4" />
  //             <div>
  //               <h2 className="text-lg font-semibold">{category.label}</h2>
  //               <p className="text-sm text-gray-500">{category.description}</p>
  //             </div>
  //           </a>
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default Listings;
