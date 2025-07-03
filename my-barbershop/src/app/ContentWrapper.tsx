// app/ContentWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryNavbar from "@/components/CategoryNavbar";

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthOrDashboard =
    pathname.startsWith("/auth") || pathname.startsWith("/dashboard");

  return (
    <>
      {!isAuthOrDashboard && <Navbar />}
      {/* {!isAuthOrDashboard && <CategoryNavbar/>} */}
    
      <main className="flex-grow">{children}</main>
      {!isAuthOrDashboard && <Footer />}
    </>
  );
}
