import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalPrice } from "@/store/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CartSummary() {
  const totalPrice = useSelector(selectCartTotalPrice);
  const cartItems = useSelector((state) => state.cart.items);

  // handle stripe checkout
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      console.log("Cart Items", cartItems);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      const { sessionId } = await response.json();
      // if (url) {
      await stripe.redirectToCheckout({ sessionId });
      // }
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };
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
            <p className="font-semibold ">${totalPrice}</p>
          </div>
          <div className="flex justify-between px-5 py-2 text-gray-600">
            <p>Shipping</p>
            <p className="font-semibold ">Free</p>
          </div>
          <div className="flex justify-between px-5 py-2 my-4 text-gray-800 font-semibold bg-gray-300">
            <p>Total </p>
            <p className="font-semibold ">${totalPrice}</p>
          </div>
        </div>
      </div>
      <button
        className="inline-flex
       w-full justify-center items-center text-white text-base font-medium uppercase py-2  rounded bg-black hover:bg-gray-700 hover:shadow hover:shadow-gray-800"
        onClick={handleCheckout}
      >
        checkout
      </button>
    </>
  );
}
