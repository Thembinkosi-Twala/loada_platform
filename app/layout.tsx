import { Suspense } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import SearchModal from "@/components/modals/SearchModal";
import ToasterProvider from "@/providers/ToasterProvider";
import QueryProvider from "@/providers/QueryProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";


export const metadata = {
  title: "Loada Platform",
  description: "The Loada Platform",
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
          <LoginModal />
          <Navbar currentUser={currentUser} />
          <div className="flex">
            {/* Sidebar remains fixed */}
            {/* <Sidebar /> */}
            {/* Page content renders dynamically here */}
            <main className="flex-grow p-4 md:pt-28 pt-24 overflow-auto">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
