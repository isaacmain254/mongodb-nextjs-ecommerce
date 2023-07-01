import React from "react";

export default function CartSummary() {
  return (
    <>
      <div className="bg-gray-100 ">
        <div className="border-b border-gray-400">
          <p className="font-semibold text-lg px-5 py-3 text-gray-700">
            Order Summary
          </p>
        </div>
        <div>
          <div className="flex justify-between px-5 py-2 text-gray-600">
            <p>Order total</p>
            <p className="font-semibold ">$100</p>
          </div>
          <div className="flex justify-between px-5 py-2 text-gray-600">
            <p>Shipping</p>
            <p className="font-semibold ">Free</p>
          </div>
          <div className="flex justify-between px-5 py-2 my-4 text-gray-800 font-semibold bg-gray-300">
            <p>Total </p>
            <p className="font-semibold ">$500</p>
          </div>
        </div>
      </div>
      <button
        className="inline-flex
       w-full justify-center items-center text-white text-base font-medium uppercase py-2  rounded bg-black hover:bg-gray-700 hover:shadow hover:shadow-gray-800"
      >
        checkout
      </button>
    </>
  );
}
