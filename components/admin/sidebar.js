"use client";
import Link from "next/link";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    title: "Dashboard",
    to: "",
    icon: <DashboardIcon />,
  },
  {
    title: "Products",
    to: "/products",
    icon: <InventoryIcon />,
  },
  {
    title: "Customers",
    to: "/customers",
    icon: <PeopleIcon />,
  },
  {
    title: "Orders",
    to: "/orders",
    icon: <InventoryIcon />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <ul>
        {navLinks.map((navLink, index) => (
          <li
            key={index}
            className={`text-gray-600 p-2 hover:bg-slate-400 my-1 ${
              pathname === `/admin${navLink.to}`
                ? "bg-slate-800 text-white"
                : ""
            }`}
          >
            <Link
              href={`/admin/${navLink.to}`}
              className="flex items-center gap-2"
            >
              {navLink.icon}
              {navLink.title}
            </Link>
          </li>
        ))}
        <div className="border-b border-gray-400" />
      </ul>
    </>
  );
};

export default Sidebar;
