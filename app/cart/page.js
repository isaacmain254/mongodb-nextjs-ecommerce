"use client";
import Image from "next/image";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CartSummary from "@/components/cartSummary";
import { useCartItems } from "@/utils/CartContextProvider";

import { useCartDispatch } from "../../utils/CartContextProvider";

export default function ShoppingCart() {
  const cartItems = useCartItems();
  const dispatch = useCartDispatch();
  function handleRemoveItemFromCart(id) {
    dispatch({ type: "REMOVE_FROM_CART", payload: { itemId: id } });
  }
  return (
    <>
      <section className="w-11/12 mx-auto mt-20">
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
                  {cartItems.cart.map((item) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-50"
                      key={item.id}
                    >
                      <td className="w-32 px-6 py-4">
                        {item.images.length > 0 && (
                          <Image
                            src={item.images[0]}
                            width={64}
                            height={64}
                            alt="my shoe"
                            className="w-fit h-full object-cover aspect-square "
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {item.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
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
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 tx-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                              required
                            />
                          </div>
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
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
                        {item.price}
                      </td>
                      <td
                        className="px-6 py-4 font-medium text-red-600 hover:underline cursor-pointer"
                        onClick={() => handleRemoveItemFromCart(item.id)}
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
