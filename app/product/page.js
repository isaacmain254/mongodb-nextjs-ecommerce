"use client";

import Image from "next/image";
import React, { useState } from "react";
import Shoe from "@/public/images/Men's Barklay Canvas Plain .jpeg";
import BlackBoot from "@/public/images/desert-boots.jpeg";
import { useRef } from "react";
import { Rating } from "@mui/material";
import Button from "@/components/Button";

const images = [
  {
    id: 1,
    src: "/images/black-boot.png",
  },
  {
    id: 2,
    src: "/images/desert-boots.jpeg",
  },
  {
    id: 3,
    src: "/images/Men's Barklay Canvas Plain .jpeg",
  },
];

const Product = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [itemQuantity, setItemQuantity] = useState(0);

  // Increment quantity
  const handleItemQuantityIncrement = () => {
    setItemQuantity((value) => value + 1);
  };

  // decrement item quantity
  const handleItemQuantityDecrease = () => {
    if (itemQuantity <= 0) {
      return;
    }
    setItemQuantity((value) => value - 1);
  };

  // handle ADD TO CART button click
  function handleAddToCartButtonClick() {
    if (itemQuantity === 0) {
      setItemQuantity((value) => value + 1);
    }
    return;
  }
  // function for changing the current displayed image
  const handleImageClick = (image) => {
    setCurrentImage(image);
  };
  return (
    <>
      <section className="w-10/12 h-[90vh] mx-auto">
        <div className="w-full h-full flex gap-10">
          <div className="w-1/2 h-full ">
            <div className="h-5/6 bg-white">
              {currentImage && (
                <Image
                  src={currentImage.src}
                  width={500}
                  height={500}
                  alt="my shoe"
                  className="w-full  h-full object-contain"
                />
              )}
            </div>
            <div className=" h-1/6 flex justify-center">
              <ul className="flex gap-4 ">
                {images.map((image) => (
                  <li key={image.id}>
                    <Image
                      src={image.src}
                      width={64}
                      height={64}
                      alt="my shoe"
                      onClick={() => handleImageClick(image)}
                      className="w-fit h-full object-cover aspect-square bg-white cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-1/2">
            <p className="text-xl font-sans font-medium my-4">category</p>
            <h1 className="text-black text-4xl opacity-80 font-semibold font-sans ">
              Black Boots
            </h1>
            <div className="flex justify-between items-center">
              <p className="my-3 font-serif text-3xl font-light">$100</p>
              <Rating name="item-rating" defaultValue={2.5} precision={0.5} />
            </div>
            <p className="py-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              quasi nostrum exercitationem sequi non dolorum, voluptatibus
              possimus ad vel, dolores architecto placeat doloremque similique?
              Nisi, repudiandae harum eveniet aliquam voluptas quidem dolorem
              tempora hic cupiditate nulla numquam. Praesentium delectus error
              quis repellat. Ex autem vitae veniam error aliquid veritatis vero
              incidunt debitis. Tempora ducimus dolor maxime neque fugit sequi
              aliquid.
            </p>
            <p className="font-semibold opacity-90">Select color</p>
            <div className="flex gap-3 py-2">
              <div className="w-5 h-5 bg-slate-700 rounded-full cursor-pointer "></div>
              <div className="w-5 h-5 bg-black rounded-full cursor-pointer "></div>
              <div className="w-5 h-5 bg-black rounded-full cursor-pointer "></div>
            </div>
            <p className="font-semibold opacity-90 py-2">Quantity</p>
            <div className="flex gap-4">
              <p
                className="border-2 border-slate-400 px-3 text-xl font-bold rounded cursor-pointer"
                onClick={handleItemQuantityDecrease}
              >
                -
              </p>
              <p className="border-2 border-slate-400 px-3 text-xl font-semibold rounded cursor-pointer">
                {itemQuantity}
              </p>
              <p
                className="border-2 border-slate-400 px-3 text-xl font-bold rounded cursor-pointer"
                onClick={handleItemQuantityIncrement}
              >
                +
              </p>
            </div>
            <button
              className="w-64 my-9 rounded  py-2 bg-black opacity-90 text-white "
              onClick={handleAddToCartButtonClick}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
