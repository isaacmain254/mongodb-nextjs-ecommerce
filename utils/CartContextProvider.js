"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";

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

  // load items from local storage on component mount
  useEffect(() => {
    const Items = localStorage.getItem("cartItem");
    if (Items) {
      dispatch({ type: "SET_CART", payload: { cart: JSON.parse(Items) } });
    }
  }, []);

  // save cart items to localstorage whenever the  cart changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems.cart));
  }, [cartItems.cart]);
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
const initialCartItems = { cart: [] };

// reducer function
function cartItemsReducer(cartItems, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;
      // check whether  an item already exist in the cart
      const itemExists = cartItems.cart.find((item) => item.id === newItem.id);
      if (itemExists) {
        // item already exist in the cart , return the existing cart
        return cartItems;
      } else {
        // item does not exist return new cart with item included
        return { ...cartItems, cart: [...cartItems.cart, newItem] };
      }
    }
    case "INCREASE_QUANTITY": {
    }
    case "REMOVE_FROM_CART": {
      const { itemId } = action.payload;
      // remove the item from the  cart
      const updatedCart = cartItems.cart.filter(
        (cartItem) => cartItem.id !== itemId
      );
      return {
        ...cartItems,
        cart: updatedCart,
      };
    }
    case "SET_CART":
      return {
        ...cartItems,
        cart: action.payload.cart,
      };
    default:
      return cartItems;
  }
}
