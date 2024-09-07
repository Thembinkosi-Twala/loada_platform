"use client"; // Ensure this is at the top

import { TbBox } from "react-icons/tb";
import { GiCalendar, GiTruck, GiDeliveryDrone } from "react-icons/gi";
import { FaShippingFast, FaTruckMoving, FaWarehouse } from "react-icons/fa";
import { IoMdBuild } from "react-icons/io";
import { useRouter } from "next/navigation";

export const categories = [
  {
    label: "Container Management",
    icon: TbBox,
    href: "/categories/container-management",
  },
  {
    label: "Booking Slots",
    icon: GiCalendar,
    href: "/categories/booking-slots",
  },
  {
    label: "Truck Management",
    icon: GiTruck,
    href: "/categories/truck-management",
  },
  {
    label: "Cargo Tracking",
    icon: FaTruckMoving,
    href: "/categories/cargo-tracking",
  },
  {
    label: "Warehouse Management",
    icon: FaWarehouse,
    href: "/categories/warehouse-management",
  },
  {
    label: "Shipping",
    icon: FaShippingFast,
    href: "/categories/shipping",
  },
  {
    label: "Truck Maintenance",
    icon: IoMdBuild,
    href: "/categories/truck-maintenance",
  },
  {
    label: "Delivery Drones",
    icon: GiDeliveryDrone,
    href: "/categories/delivery-drones",
  },
  {
    label: "Fleet Management",
    icon: FaTruckMoving,
    href: "/categories/fleet-management",
  },
];

const Sidebar = () => {
  const router = useRouter(); // Use router from next/navigation

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 font-bold text-xl">Dashboard</div>
      <ul className="mt-4 space-y-2">
        {categories.map((category) => (
          <li key={category.label}>
            <button
              className="w-full text-left"
              onClick={() => router.push(category.href)}
            >
              <div className="flex items-center p-4 hover:bg-gray-700 transition">
                <category.icon className="text-2xl mr-3" />
                {category.label}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
