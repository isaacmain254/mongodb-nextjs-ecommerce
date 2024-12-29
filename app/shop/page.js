"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
// import { products } from "@/lib/products";
import Link from "next/link";
import Item from "@/components/Item";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const searchParam = useSearchParams();
  const search = searchParam.get("search");
  const size = searchParam.get("size");
  const activePrice = searchParam.get("price");
  const router = useRouter();

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/products");
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, [products]);
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
    setSelectedSize("");
    selectedPrice("");
    router.push("/shop");
  };
  const sizes = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const prices = [
    { label: "Under $10", value: "0-10" },
    { label: "$10 - $20", value: "10-20" },
    { label: "$20 - $30", value: "20-30" },
    { label: "$30 - $40", value: "30-40" },
    { label: "$40 - $50", value: "40-50" },
    { label: "Over $50", value: "50" },
  ];

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    updateURL("size", size);
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    updateURL("price", price);
  };

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

    if (selectedPrice) {
      if (selectedPrice === "0-10") {
        filtered = filtered.filter((product) => product.price < 10);
      } else if (selectedPrice === "10-20") {
        filtered = filtered.filter(
          (product) => product.price >= 10 && product.price < 20
        );
      } else if (selectedPrice === "20-30") {
        filtered = filtered.filter(
          (product) => product.price >= 20 && product.price < 30
        );
      } else if (selectedPrice === "30-40") {
        filtered = filtered.filter(
          (product) => product.price >= 30 && product.price < 40
        );
      } else if (selectedPrice === "40-50") {
        filtered = filtered.filter(
          (product) => product.price >= 40 && product.price < 50
        );
      } else if (selectedPrice === "50") {
        filtered = filtered.filter((product) => product.price >= 50);
      }
    }
    setFilteredProducts(filtered);
  }, [search, selectedSize, selectedPrice]);
  return (
    <div className="flex gap-3 w-full md:w-11/12 mx-auto mb-5">
      <div className="hidden lg:block w-52 h-fit bg-white py-5 px-2">
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
                  checked={price.value === activePrice}
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
      </div>
      <div className="flex-1">
        {products.length ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <li key={product._id}>
                <Link href={`/product/${product.slug}`}>
                  <Item
                    rating={product.rating}
                    imageSrc={product.images[0]}
                    price={product.price}
                    title={product.name}
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-2xl text-center">No match found</div>
        )}
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
