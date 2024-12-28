"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { products } from "@/lib/products";
import Link from "next/link";
import Item from "@/components/Item";

const Shop = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const searchParam = useSearchParams();
  const search = searchParam.get("search");
  const size = searchParam.get("size");
  const router = useRouter();

  const sizes = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const prices = [
    { label: "Under $100", value: 0 - 100 },
    { label: "$100 - $200", value: 100 - 200 },
    { label: "$200 - $300", value: 200 - 300 },
  ];

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    router.push(`/shop?size=${encodeURIComponent(size)}`);
    // const params = new URLSearchParams(router.query);
    // params.set("size", size);
    // router.push(`/shop?${params.toString()}`);
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    router.push(`/shop?price=${encodeURIComponent(price)}`);
  };
  const activePrice = searchParam.get("price");
  useEffect(() => {
    let filtered = products;
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedSize) {
      filtered = filtered.filter((product) => product.size === selectedSize);
    }
    setFilteredProducts(filtered);
  }, [search, selectedSize]);
  return (
    <div className="flex gap-3 w-full md:w-11/12 mx-auto mb-5">
      <div className="hidden lg:block w-52 bg-white">
        <div className="py-5 px-1">
          <p className="font-semibold text-center py-2">Sizes</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 rounded ${
                  selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {/* <div className="py-5 px-1">
          <p className="font-semibold text-center py-2">Prices</p>
          <form className="">
            {prices.map((price, index) => (
              <div key={index} className="py-2">
                <input
                  type="radio"
                  name="price"
                  id={price.value}
                  value={price.value}
                  // defaultChecked={activePrice === selectedPrice}
                  // onChange={handlePriceChange}
                  onSelect={() => handlePriceChange(price.value)}
                />
                <label htmlFor={price.value}>{price.label}</label>
              </div>
            ))}
          </form>
        </div> */}
      </div>
      <div className="flex-1">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link href={`/product/${product.slug}`}>
                <Item
                  rating={product.rating}
                  imageSrc={product.images[0]}
                  price={product.price}
                  title={product.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Shop />
    </Suspense>
  );
};

export default ShopPage;
