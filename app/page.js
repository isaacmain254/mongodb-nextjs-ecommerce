"use client";
import Button from "@/components/Button";
import Item from "@/components/Item";
import Image from "next/image";
import React, { useState } from "react";
import Shoe from "@/public/images/Men's Barklay Canvas Plain .jpeg";
import BlackBoots from "@/public/images/black-boots.jpeg";
import DesertBoots from "@/public/images/desert-boots.jpeg";
import { products } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  const [ratingValue, setRatingValue] = useState(2);

  // count cart items after click

  // handle Rating value change
  const handleRatingChange = () => {
    setRatingValue(ratingValue);
  };

  return (
    <>
      <section className="w-10/12 mx-auto  h-[85vh]">
        <div className="flex w-full mx-auto h-full items-center">
          <div className=" w-1/2 h-auto ml-9">
            <p className="font-bold text-base">SPORT</p>
            <p className="font-bold text-base mb-6">NEW COLLECTION</p>
            <p className="font-thin text-4xl pt-6 font-mono opacity-80">
              FOOTWARE
            </p>
            <h1 className="font-semibold text-6xl py-6 font-serif opacity-80">
              BOOT IN BLACK
            </h1>
            <p className="font-sans text-xl font-medium mb-9">
              The upper is made of animal free and weather resistant cardura
              nylon.
            </p>
            <Button uri="/shop">SHOP NOW</Button>
          </div>
          <div className="w-1/2">
            <Image
              src="/images/black-boot.png"
              width={550}
              height={550}
              alt="men black boots outfit"
            />
          </div>
        </div>
      </section>

      {/* products array from the lib folder */}
      <section className="w-11/12 mx-auto my-9 h-auto bg-white">
        <h3 className="text-center text-2xl font-sans my-6 ">OUR PRODUCTS</h3>

        <ul className="flex gap-12 justify-center mb-8 mt-3">
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/product/${product.slug}`}>
                <Item
                  value={ratingValue}
                  imageSrc={product.images[0]}
                  price={product.price}
                  title={product.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* featured products section */}
      <section className="w-11/12 mx-auto my-9 h-auto bg-white">
        <h3 className="text-center text-2xl font-sans my-6 ">
          FEATURED PRODUCTS
        </h3>
        <div className="flex gap-12 justify-center mb-8 mt-3">
          <Item
            value={ratingValue}
            imageSrc={Shoe}
            price="99.00"
            title="Men's canvas"
          />
          <Item
            value={ratingValue}
            imageSrc={Shoe}
            price="99.00"
            title="Men's canvas"
          />

          <Item
            value={ratingValue}
            imageSrc={BlackBoots}
            title="Black boots"
            price="109.00"
          />
          <Item
            value={ratingValue}
            imageSrc={BlackBoots}
            title="Black boots"
            price="109.00"
          />
        </div>
      </section>

      {/* collection section */}
      <section className="w-11/12 mx-auto  h-auto my-9">
        <div className="flex gap-8 w-full">
          <div className="w-1/2 h-72 hover:shadow-xl hover:shadow-sky-200 ">
            <div className="flex w-full h-full bg-sky-100">
              <div className="relative w-72">
                <Image
                  src={DesertBoots}
                  fill={true}
                  alt="Desert boots"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-black text-6xl font-medium my-5">
                  Hand Bags
                </p>
                <p className="text-2xl text-black ">View collections</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-72 hover:shadow-lg hover:shadow-red-100">
            <div className="flex w-full h-full bg-red-50">
              <div className="relative w-80">
                <Image
                  src={Shoe}
                  fill={true}
                  alt="Desert boots"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-black text-6xl font-medium my-5">
                  Hand Bags
                </p>
                <p className="text-2xl text-black ">View collections</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New products section */}
      <section className="w-11/12 mx-auto my-16 h-auto bg-white">
        <h3 className="text-center text-2xl font-sans my-6 ">New PRODUCTS</h3>
        <div className="flex gap-12 justify-center mb-8 mt-3">
          <Item
            value={ratingValue}
            imageSrc={Shoe}
            price="99.00"
            title="Men's canvas"
          />
          <Item
            value={ratingValue}
            imageSrc={Shoe}
            price="99.00"
            title="Men's canvas"
          />

          <Item
            value={ratingValue}
            imageSrc={BlackBoots}
            title="Black boots"
            price="109.00"
          />
          <Item
            value={ratingValue}
            imageSrc={BlackBoots}
            title="Black boots"
            price="109.00"
          />
        </div>
      </section>

      {/* subscribe  to news letter */}
      <section className="w-11/12 mx-auto my-9 border-2 border-red-500">
        <div className="flex w-full gap-10">
          <div className="w-2/3 border-2 border-black">b cxd xdc `1 ``` ``</div>
          <div className="w-1/3 border-2 border-lime-700">
            <p>ihgfedio</p>
          </div>
        </div>
      </section>
    </>
  );
}
