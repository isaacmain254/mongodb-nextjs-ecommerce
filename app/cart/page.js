"use client";
import Image from "next/image";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CartSummary from "@/components/cartSummary";
import { useCartItems } from "@/utils/CartContextProvider";
import { useSelector, useDispatch } from "react-redux";

import { useCartDispatch } from "../../utils/CartContextProvider";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/cartSlice";
export default function ShoppingCart() {
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  // const cartItems = useCartItems();
  return (
    <>
      <section className="w-11/12 mx-auto">
        <div className="flex h-auto w-full gap-6">
          <div className="w-4/5 h-full ">
            <div className="">
              <table className="table-auto text-left w-full">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3"></th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6  py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 && <tr>Your cart is empty.</tr>}
                  {cart.items.map((item) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-50"
                      key={item.id}
                    >
                      <td className="w-32 px-6 py-4">
                        {/* {item.images.length > 0 && ( */}
                        <Image
                          src={item.image}
                          width={64}
                          height={64}
                          alt="my shoe"
                          className="w-fit h-full object-cover aspect-square "
                        />
                        {/* )} */}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {item.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                            onClick={() =>
                              dispatch(decreaseQuantity({ id: item.id }))
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <RemoveIcon
                              sx={{ color: ["#1e1e1e"] }}
                              fontSize="small"
                            />
                          </button>
                          <div>
                            <input
                              type="number"
                              value={item.quantity}
                              id="first-product"
                              readOnly
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 tx-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                              required
                            />
                          </div>
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                            onClick={() =>
                              dispatch(increaseQuantity({ id: item.id }))
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <AddIcon
                              sx={{ color: ["#1e1e1e"] }}
                              fontSize="small"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${item.price * item.quantity}
                      </td>
                      <td
                        className="px-6 py-4 font-medium text-red-600 hover:underline cursor-pointer"
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        Remove
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-1/5 ">
            <CartSummary />
          </div>
        </div>
      </section>
    </>
  );
}
