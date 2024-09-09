import { Suspense } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/components/navbar/Navbar"; // Navigation bar component
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import SearchModal from "@/components/modals/SearchModal";
import ToasterProvider from "@/providers/ToasterProvider";
import QueryProvider from "@/providers/QueryProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Sidebar from "@/components/Sidebar/Sidebar"; // Sidebar component
import HelpdeskButton from "@/components/HelpdeskButton";
import Link from "next/link";
import Footer from "@/components/footer";

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
          {/* Modals */}
          <Suspense fallback={<></>}>
            <SearchModal />
          </Suspense>
          <RegisterModal />
          <LoginModal />
          {/* Navbar */}
          <Navbar currentUser={currentUser} />
          {/* Layout */}
          <div className="flex">
            {/* Sidebar */}
          
            {/* Page content */}
            <main className="flex-grow p-4 pt-24 md:pt-28 overflow-auto">
              {children}
            </main>
          </div>
          <Footer/>
        </QueryProvider>
      </body>
    </html>
  );
}
