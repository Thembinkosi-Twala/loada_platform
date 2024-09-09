/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
    ],
  },
  pages: {
    '/': {
      page: 'index',
    },
    '/container-management': {
      page: '/ContainerManagement',
    },
    '/booking': {
      page: '/Booking',
    },
    '/truck-management': {
      page: '/TruckManagement',
    },
    '/cargo-tracking': {
      page: '/CargoTracking',
    },
    '/warehouse-management': {
      page: '/WarehouseManagement',
    },
    '/shipping': {
      page: '/Shipping',
    },
    '/truck-maintenance': {
      page: '/TruckMaintenance',
    },
    '/delivery-drones': {
      page: '/DeliveryDrones',
    },
    '/fleet-management': {
      page: '/FleetManagement',
    },
  },
};

module.exports = nextConfig;