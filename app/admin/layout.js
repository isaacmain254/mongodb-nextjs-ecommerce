"use client";
import Sidebar from "@/components/admin/sidebar";
import { AlignJustify, X } from "lucide";
import Link from "next/link";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SessionProvider } from "next-auth/react";

// export const metadata = {
//   title: "Admin dashboard",
//   description: "Admin dashboard for Men Sneakers and shoes e-commerce",
// };

export default function AdminLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleMenuToggle = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <SessionProvider>
      <div className="block md:hidden text-xl" onClick={handleMenuToggle}>
        {showSidebar ? (
          <CloseIcon sx={{ fontSize: 40 }} />
        ) : (
          <MenuIcon sx={{ fontSize: 40 }} />
        )}
      </div>
      <div className="flex gap-3 w-full lg:w-11/12 mx-auto md:-mt-8">
        <div
          className={`${
            showSidebar ? "block absolute z-30  bg-gray-900" : "hidden"
          }  md:block w-44 p-2 bg-gray-300 rounded-md`}
        >
          <Sidebar />
        </div>
        <main className="flex-1 w-full min-h-[calc(100vh-78px)] p-2 rounded-md bg-white overflow-auto">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
