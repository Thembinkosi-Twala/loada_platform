import { TbBox } from "react-icons/tb";
import { GiCalendar, GiTruck, GiDeliveryDrone } from "react-icons/gi";
import { FaShippingFast, FaTruckMoving, FaWarehouse } from "react-icons/fa";
import { IoMdBuild } from "react-icons/io";
import Link from "next/link";

// Categories array with an adminOnly flag
export const categories = [
  {
    label: "Container Management",
    icon: TbBox,
    description: "Manage and track your containers.",
    href: "/categories/container-management",
    adminOnly: true, // Visible only to admins
  },
  {
    label: "Booking Slots",
    icon: GiCalendar,
    description: "Manage your booking slots efficiently.",
    href: "/categories/booking-slots",
  },
  {
    label: "Truck Management",
    icon: GiTruck,
    description: "Manage and track your fleet of trucks.",
    href: "/categories/truck-management",
  },
  {
    label: "Cargo Tracking",
    icon: FaTruckMoving,
    description: "Track the real-time status of your cargo.",
    href: "/categories/cargo-tracking",
  },
  {
    label: "Warehouse Management",
    icon: FaWarehouse,
    description: "Oversee warehouse operations and stock levels.",
    href: "/categories/warehouse-management",
    adminOnly: true, // Visible only to admins
  },
  {
    label: "Shipping",
    icon: FaShippingFast,
    description: "Manage shipping schedules and logistics.",
    href: "/categories/shipping",
  },
  {
    label: "Truck Maintenance",
    icon: IoMdBuild,
    description: "Track and manage truck maintenance schedules.",
    href: "/categories/truck-maintenance",
  },
  {
    label: "Delivery Drones",
    icon: GiDeliveryDrone,
    description: "Utilize drones for fast and efficient deliveries.",
    href: "/categories/delivery-drones",
    adminOnly: true, // Visible only to admins
  },
  {
    label: "Fleet Management",
    icon: FaTruckMoving,
    description: "Oversee and manage the entire fleet of vehicles.",
    href: "/categories/fleet-management",
    adminOnly: true, // Visible only to admins
  },
];

// Listing batch constant
export const LISTINGS_BATCH = 10;
