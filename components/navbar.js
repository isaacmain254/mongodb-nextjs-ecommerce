"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { useCartItems } from "@/utils/CartContextProvider";
// import { signIn, useSession } from "next-auth/react";
import Logout from "./logout";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "@/store/cartSlice";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const totalItems = useSelector(selectCartTotalItems);
  // const { data: session } = useSession();

  // const cartItems = useCartItems();
  // const cartQuantity = cartItems.cart.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );
  // handle submit button
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText("");
  };
  // if (session) {
  //   console.log(session);
  // }

  return (
    <>
      {/* {!isAdminPage && ( */}
      <header className=" w-full bg-gray-300 z-10 fixed top-0">
        <div className="flex  flex-row  w-11/12 mx-auto justify-between items-center relative ">
          <Link href="/">
            <Image
              src="/images/shop-logo.png"
              width={75}
              height={75}
              alt="logo"
              priority={true}
            />
          </Link>
          <form
            className="flex gap-4 items-center"
            onSubmit={handleSearchSubmit}
          >
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

          <div className=" flex flex-row gap-4 items-center">
            {/* {session ? (
            <div className="group relative flex flex-col gap-6">
              <div className="flex gap-3 items-center bg-gray-200 rounded py-1 px-3  hover:shadow hover:shadow-gray-50">
                <img
                  src={session.user?.image}
                  alt="user profile"
                  className="w-10 h-10 rounded-full"
                />
                <span>{session.user?.name}</span>
              </div>
              <Logout className="absolute invisible group-hover:visible z-50" />
            </div>
          ) : (
            <button
              className="bg-gray-200 border border-gray-200 rounded px-5 py-1  hover:shadow hover:shadow-gray-50"
              onClick={() => signIn()}
            >
              login
            </button>
          )} */}
            {!isAdminPage && (
              <Link href="/cart">
                <Badge badgeContent={totalItems} color="warning">
                  <ShoppingCartOutlined />
                </Badge>
              </Link>
            )}
          </div>
        </div>
      </header>
      {/* )} */}
    </>
  );
};

export default Navbar;
