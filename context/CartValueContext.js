"use client";
import React, { createContext, useState } from "react";

export const CartQuantityContext = createContext(null);

export default function ItemQuantityeContext({ children }) {
  const [itemQuantity, setItemQuantity] = useState(0);
  return (
    <CartQuantityContext.Provider value={{ itemQuantity, setItemQuantity }}>
      {children}
    </CartQuantityContext.Provider>
  );
}
