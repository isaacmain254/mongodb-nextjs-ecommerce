"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Shoe from "@/public/images/Men's Barklay Canvas Plain .jpeg";
import BlackBoot from "@/public/images/desert-boots.jpeg";
import { Rating } from "@mui/material";
import Button from "@/components/Button";
import { products } from "@/lib/products";
import { useCartDispatch, useCartItems } from "@/utils/CartContextProvider";
import { CartQuantityContext } from "@/utils/CartValueContext";
import ProductGallery from "@/components/ProductGallery";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/cartSlice";

let cartItemId = 1;

// const Product = async () => {
export default function Product() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // const dispatch = useCartDispatch();
  // const cartItems = useCartItems();

  // const { itemQuantity, setItemQuantity } = useContext(CartQuantityContext);
  // Get item id from the url
  const params = useParams();
  const Slug = params.slug;
  console.log("slug", Slug);
  const findProductBySlug = (slug) => {
    return products.find((product) => product.slug === slug);
  };

  const product = findProductBySlug(Slug);
  // Get the quantity of the current product in the cart
  const getQuantity = () => {
    const item = cartItems.find((item) => item.id === product.id);
    return item ? item.quantity : 0;
  };
  // Increment quantity
  const handleItemQuantityIncrement = () => {
    dispatch(increaseQuantity({ id: product.id }));
  };

  // decrement item quantity
  const handleItemQuantityDecrease = () => {
    dispatch(decreaseQuantity({ id: product.id }));
  };

  // handle ADD TO CART button click
  function handleAddToCartButtonClick() {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        image: product.images[0],
        price: product.price,
      })
    );
  }

  // function for changing the current displayed image
  // const handleImageClick = (image) => {
  //   setCurrentImage(image);
  // };

  // get product
  // const productDetails = await getProductDetails(Slug);
  // const prod = productDetails.products;
  // console.log(prod);

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
      <section className="w-full lg:w-10/12 mx-auto">
        <p className="flex w-full h-full justify-center items-center"></p>
        <div className="w-full h-full flex flex-col md:flex-row gap-10">
          <div className="w-full h-full md:w-1/2 md:h-[500px]">
            <ProductGallery product={product} />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-xl font-sans font-medium">
              category: {product.category}{" "}
            </p>
            <h1 className="text-black text-4xl opacity-80 font-semibold font-sans ">
              {product.title}
            </h1>
            <div className="flex justify-between items-center">
              <p className="my-3 font-serif text-3xl font-light">
                ${product.price}
              </p>
              <Rating
                value={product.rating}
                name="item-rating"
                defaultValue={2.5}
                precision={0.5}
              />
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

              <span className="border-2 border-slate-400 px-3 text-xl font-semibold rounded cursor-pointer ">
                {getQuantity()}
              </span>
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
              {getQuantity() === 0 ? "Add to Cart" : "Already in Cart"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// export default Product;

async function getProductDetails(slug) {
  const res = await fetch(`http://localhost:3000/api/product/${slug}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  console.log(res);
  return res.json();
}

// async function getProductDetails(Slug) {
//   await dbConnect();
//   try {
//     const res = await Brand.findOne({ slug: Slug }).lean();
//     return res;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// "@emotion/react": "^11.11.1",
// "@emotion/styled": "^11.11.0",
// "@mui/icons-material": "^5.11.16",
// "@mui/material": "^5.13.5",
// "next-auth": "^4.22.1"
// "eslint-config-next": "15.1.2",
