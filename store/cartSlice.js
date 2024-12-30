import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; // If the item already exists, increase its quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add a new item with quantity 1
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increase the item's quantity
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1; // Decrease the item's quantity
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id); // Remove the item from the cart
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartTotalPrice = (state) => {
  return state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const selectCartTotalItems = (state) => {
  return state.cart.items.length; // Count of unique items
};

export const selectCartTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};
