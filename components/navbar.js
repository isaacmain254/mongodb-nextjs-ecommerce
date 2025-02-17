"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Logout from "./logout";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "@/store/cartSlice";

const Navbar = ({ session }) => {
const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const totalItems = useSelector(selectCartTotalItems);
  const router = useRouter();
  const searchParam = useSearchParams();

  // Merge search param to the current url
  const updateURL = (key, value) => {
    const currentParams = new URLSearchParams(searchParam.toString());

    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }

    router.push(`/shop?${currentParams.toString()}`);
  };
  // const { data: session } = useSession();

  // const cartItems = useCartItems();
  // const cartQuantity = cartItems.cart.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );
  // handle submit button
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateURL("search", searchText);
    // router.push(`/shop?search=${encodeURIComponent(searchText)}`);
    setSearchText("");
  };

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
          {/* <div className="flex">
            <Link href="/shop">Products</Link>
          </div> */}
          <form
            className="lg:w-1/3 flex items-center bg-white rounded-full p-1.5"
            onSubmit={handleSearchSubmit}
          >
            <SearchIcon fontSize="small" />
            <input
              type="search"
              name="search"
              id="search"
              value={searchText}
              placeholder="search..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full text-base text-slate-600 font-sans outline-none"
            />
          </form>

          <div className=" flex flex-row gap-4 items-center">
            {isAdminPage &&
              (session ? (
                <div className="group relative flex flex-col gap-6">
                  {/* <div className="flex gap-3 items-center bg-gray-200 rounded py-1 px-3  hover:shadow hover:shadow-gray-50">
                    <img
                      src={session.user?.image}
                      alt="user profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{session.user?.name}</span>
                  </div> */}
                  <Logout className="absolute invisible group-hover:visible z-50" />
                </div>
              ) : (
                <Link
                  className="bg-gray-200 border border-gray-200 rounded px-5 py-1  hover:shadow hover:shadow-gray-50"
                  href="/auth/signin"
                >
                  login
                </Link>
              ))}
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

const NavbarWithSuspense = ({ session }) => {
  return (
    <Suspense>
      <Navbar session={session} />
    </Suspense>
  );
};

export default NavbarWithSuspense;
