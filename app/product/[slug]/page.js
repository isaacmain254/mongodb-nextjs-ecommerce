"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Shoe from "@/public/images/Men's Barklay Canvas Plain .jpeg";
import BlackBoot from "@/public/images/desert-boots.jpeg";
import { useRef } from "react";
import { Rating } from "@mui/material";
import Button from "@/components/Button";
import { products } from "@/lib/products";
import { useCartDispatch, useCartItems } from "@/utils/CartContextProvider";
import { CartQuantityContext } from "@/utils/CartValueContext";

let cartItemId = 1;

const Product = () => {
  const [currentImage, setCurrentImage] = useState();
  const imageref = useRef();
  const dispatch = useCartDispatch();
  const cartItems = useCartItems();

  const { itemQuantity, setItemQuantity } = useContext(CartQuantityContext);
  console.log(itemQuantity);
  // Get item id from the url
  const params = useParams();
  const Slug = params;

  // Increment quantity
  const handleItemQuantityIncrement = () => {
    setItemQuantity((value) => value + 1);
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: itemQuantity },
    });
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
  // const handleImageClick = (image) => {
  //   setCurrentImage(image);
  // };
  const handleImageClick = () => {
    imageref.current;
  };

  // get product data
  const product = products.find(({ slug }) => slug === Slug.slug);
  if (!product) {
    return <div>Page Not Found</div>;
  }

  // calling dispatch to update cart om 'ADD To CART' button click
  // calling dispatch to update cart om 'ADD To CART' button click
  function addToCartHandler() {
    dispatch((prevState) => ({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: (cartItems.cart.quantity || 0) + 1 },
    }));
  }

  return (
    <>
      <section className="w-10/12  mt-20 mx-auto">
        <div className="w-full h-full flex gap-10">
          <div className="w-1/2 h-full ">
            <div className="h-5/6 bg-white">
              <Image
                ref={imageref}
                src={product.images[0]}
                width={500}
                height={500}
                alt="my shoe"
                className="w-full  h-full object-contain"
              />
            </div>
            <div className=" h-1/6 flex justify-center">
              <ul className="flex gap-4 ">
                {product.images.map((image, index) => (
                  <li key={index}>
                    <Image
                      src={image}
                      width={64}
                      height={64}
                      alt="my shoe"
                      onClick={handleImageClick}
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
              {product.title}
            </h1>
            <div className="flex justify-between items-center">
              <p className="my-3 font-serif text-3xl font-light">
                ${product.price}
              </p>
              <Rating name="item-rating" defaultValue={2.5} precision={0.5} />
            </div>
            <p className="py-5">{product.description}</p>
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
              {cartItems.cart.map((item) => (
                <p className="border-2 border-slate-400 px-3 text-xl font-semibold rounded cursor-pointer ">
                  {item.quantity}
                </p>
              ))}
              <p
                className="border-2 border-slate-400 px-3 text-xl font-bold rounded cursor-pointer"
                onClick={handleItemQuantityIncrement}
              >
                +
              </p>
            </div>
            <button
              className="w-64 my-9 rounded  py-2 bg-black opacity-90 text-white "
              onClick={addToCartHandler}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </section>
      {/* <p>{product.title}</p> */}
    </>
  );
};

export default Product;
