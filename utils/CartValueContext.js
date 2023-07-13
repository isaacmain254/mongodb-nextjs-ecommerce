"use client";
import React, { createContext, useEffect, useState } from "react";

export const CartQuantityContext = createContext(null);

export default function ItemQuantityeContext({ children }) {
  const [itemQuantity, setItemQuantity] = useState(() => {
    let initialQuantity = 0;
    if (typeof window !== "undefined") {
      const storedQuantity = localStorage.getItem("cartItemQuantity");
      initialQuantity = storedQuantity ? parseInt(storedQuantity) : 0;
    }

    return initialQuantity;
  });

  useEffect(() => {
    localStorage.setItem("cartItemQuantity", itemQuantity.toString());
  }, [itemQuantity]);

  return (
    <CartQuantityContext.Provider value={{ itemQuantity, setItemQuantity }}>
      {children}
    </CartQuantityContext.Provider>
  );
}
