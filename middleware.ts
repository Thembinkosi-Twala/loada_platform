export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/shippings", "/Containers", "/Bookings", "/Trucks","/Profile"],
};
