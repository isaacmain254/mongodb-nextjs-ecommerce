import Link from "next/link";
import React from "react";

const navLinks = [
  {
    title: "Admin",
    to: "",
  },
  {
    title: "Products",
    to: "products",
  },
  {
    title: "Customers",
    to: "customers",
  },
];

const Sidebar = () => {
  return (
    <>
      <ul>
        {navLinks.map((navLink, index) => (
          <li key={index}>
            <Link href={`/admin/${navLink.to}`}>{navLink.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
