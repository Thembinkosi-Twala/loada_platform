export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/container-management", "/booking-slots", "/truck-management",
    "/cargo-tracking", "/warehouse-management", "/shipping", "/truck-maintenance",
  "/delivery-drones","/fleet-management"],
};
 