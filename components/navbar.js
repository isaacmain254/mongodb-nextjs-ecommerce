"use client";
import Image from "next/image";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  // handle submit button
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText("");
  };
  console.log(searchText);
  return (
    <header className="shadow ">
      <div className="flex flex-row  w-11/12 mx-auto justify-between items-center">
        <Image
          src="/images/shop-logo.png"
          width={75}
          height={75}
          alt="logo"
          priority={true}
        />
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

          <Badge badgeContent={4} color="warning">
            <ShoppingCartOutlined />
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
