"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/cartSlice";

export default function ProductActions({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const getQuantity = () => {
    const item = cartItems.find((item) => item.id === product._id);
    return item ? item.quantity : 0;
  };

  const handleItemQuantityIncrement = () => {
    dispatch(increaseQuantity({ id: product._id }));
  };

  const handleItemQuantityDecrease = () => {
    dispatch(decreaseQuantity({ id: product._id }));
  };

  function handleAddToCartButtonClick() {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
      })
    );
  }

  return (
    <>
      <p className="font-semibold opacity-90">Select color</p>
      <div className="flex gap-3 py-2">
        <div className="w-5 h-5 bg-slate-700 rounded-full cursor-pointer"></div>
        <div className="w-5 h-5 bg-black rounded-full cursor-pointer"></div>
        <div className="w-5 h-5 bg-black rounded-full cursor-pointer"></div>
      </div>
      <p className="font-semibold opacity-90 py-2">Quantity</p>
      <div className="flex gap-4">
        <p
          className="border-2 border-slate-400 px-3 text-xl font-bold rounded cursor-pointer"
          onClick={handleItemQuantityDecrease}
        >
          -
        </p>
        <span className="border-2 border-slate-400 px-3 text-xl font-semibold rounded cursor-pointer">
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
        className="w-64 my-9 rounded py-2 bg-black opacity-90 text-white"
        onClick={handleAddToCartButtonClick}
      >
        {getQuantity() === 0 ? "Add to Cart" : "Already in Cart"}
      </button>
    </>
  );
}
