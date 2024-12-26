"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");
  return (
    <>
      {!isAdminPage && (
        <footer className="w-full  items-center bg-white ">
          <div className="border-t-2 border-slate-600 w-11/12 mx-auto">
            <p className="text-center w-full py-3">
              Made with <span className="text-red-600 text-lg"> &hearts;</span>{" "}
              by Isaac
            </p>
          </div>

          <p className="bg-gradient-to-r from-blue-500 to-fuchsia-500 w-full h-1"></p>
        </footer>
      )}
    </>
  );
};

export default Footer;
