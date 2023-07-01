"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from "react";
import { CartQuantityContext } from "@/context/CartValueContext";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const { itemQuantity } = useContext(CartQuantityContext);

  // handle submit button
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText("");
  };

  return (
    <header className=" w-full bg-gray-300 z-10 fixed top-0">
      <div className="flex  flex-row  w-11/12 mx-auto justify-between items-center ">
        <Link href="/">
          <Image
            src="/images/shop-logo.png"
            width={75}
            height={75}
            alt="logo"
            priority={true}
          />
        </Link>
        <form className="flex gap-4 items-center" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            name="search"
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" h-10 w-96 px-3 py-3 text-base text-slate-600 font-sans rounded-md outline-none"
          />
          <div className=" py-1 px-3 rounded-md bg-white hover:shadow hover:shadow-slate-600 ">
            <SearchIcon fontSize="large" />
          </div>
        </form>
        <div className="flex flex-row gap-4">
          <button>login</button>
          <Link href="/cart">
            <Badge badgeContent={itemQuantity} color="warning">
              <ShoppingCartOutlined />
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
