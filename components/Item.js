"use client";

import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";

function Item({ imageSrc, title, rating, onChange, price, label = "" }) {
  return (
    <div className="w-72 hover:shadow-md hover:shadow-gray-400">
      <div className=" w-full h-72  relative bg-gray-800 rounded overflow-hidden">
        <p className="w-fit px-2 bg-cyan-800 text-white relative z-10">
          {label}
        </p>
        <Image
          src={imageSrc}
          //   width={150}
          //   height={150}
          fill={true}
          alt="Brand new men's plain canvas"
          className="object-cover"
        />
      </div>
      <div className="my-5 flex flex-col justify-center items-center">
        <p className="font-semibold opacity-80">{title}</p>
        <Rating
          name="item-rating"
          value={rating}
          onChange={onChange}
          defaultValue={2.5}
          precision={0.5}
          className="py-3 place-content-center"
        />
        <p className="font-bold font-serif text-xl text-cyan-800 text-center">
          ${price}
        </p>
      </div>
    </div>
  );
}

export default Item;
