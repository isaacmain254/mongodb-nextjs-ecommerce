"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartContextProvider";
import ItemQuantityeContext from "./CartValueContext";

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <ItemQuantityeContext>
        <CartContextProvider>{children}</CartContextProvider>
      </ItemQuantityeContext>
    </SessionProvider>
  );
}
