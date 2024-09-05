import { Suspense } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import BookingSlotModal from "@/components/modals/BookingSlotModal";
import SearchModal from "@/components/modals/SearchModal";
import ToasterProvider from "@/providers/ToasterProvider";
import QueryProvider from "@/providers/QueryProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const metadata = {
  title: "Loada Platform",
  description:
    "The loada Platform",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <ToasterProvider />
          <Suspense fallback={<></>}>
            <SearchModal />
          </Suspense>
          <RegisterModal />
          <BookingSlotModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
          <main className="pb-20 md:pt-28 pt-24">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
