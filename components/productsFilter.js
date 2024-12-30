"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ProductsFilter = ({ shoeSize }) => {
  const searchParam = useSearchParams();
  const router = useRouter();

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

  const deleteURL = (key) => {
    router.push("/shop");
  };

  const handleSizeChange = (size) => {
    updateURL("size", size);
  };

  const handlePriceChange = (price) => {
    updateURL("price", price);
  };
  const sizes = [5, 6, 7, 8, 9, 10, 11, 12, 13];
  const prices = [
    { label: "Under $10", value: "0-10" },
    { label: "$10 - $20", value: "10-20" },
    { label: "$20 - $30", value: "20-30" },
    { label: "$30 - $40", value: "30-40" },
    { label: "$40 - $50", value: "40-50" },
    { label: "Over $50", value: "50" },
  ];
  return (
    <>
      <button className="hover:text-gray-700" onClick={deleteURL}>
        Clear filters
      </button>
      <div className="">
        <p className="font-semibold text-center py-2">Prices</p>
        <form className="">
          {prices.map((price, index) => (
            <div key={index} className="my-1 py-2">
              <input
                type="radio"
                name="price"
                id={price.value}
                value={price.value}
                // checked={price.value === activePrice}
                onChange={() => handlePriceChange(price.value)}
              />
              <label className="ps-3" htmlFor={price.value}>
                {price.label}
              </label>
            </div>
          ))}
        </form>
      </div>
      <div className="">
        <p className="font-semibold text-center py-2">Sizes</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 rounded ${
                size === shoeSize
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsFilter;
