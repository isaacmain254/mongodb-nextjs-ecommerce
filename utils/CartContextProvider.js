"use client";

import React, { createContext, useContext, useReducer } from "react";

export const CartItemsContext = createContext(null);
export const CartDispatchContext = createContext(null);

// Export functions that use the context
export function useCartItems() {
  return useContext(CartItemsContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

export default function CartContextProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartItemsReducer, initialCartItems);
  console.log(cartItems);

  return (
    <CartItemsContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartItemsContext.Provider>
  );
}

// initila value for useReducer Hook
const initialCartItems = [{ id: 10, title: "canvas", price: 45 }];

// reducer function
function cartItemsReducer(cartItems, action) {
  if (action.type === "add_to_cart") {
    return [
      ...cartItems,
      {
        id: action.id,
        title: action.title,
        price: action.price,
      },
    ];
  }
}
