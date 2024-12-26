import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Load cart data from local storage
const loadCartFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : undefined;
  } catch (error) {
    console.error("Failed to load cart from local storage:", error);
    return undefined;
  }
};
// Save cart data to local storage
const saveCartToLocalStorage = (state) => {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    const serializedCart = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Failed to save cart to local storage:", error);
  }
};
// Preload state from local storage
const preloadedState = {
  cart: loadCartFromLocalStorage() || { items: [] },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});
