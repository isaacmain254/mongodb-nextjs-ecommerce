"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

// import React from "react";
// import CartContextProvider from "./CartContextProvider";
// import ItemQuantityeContext from "./CartValueContext";

// export default function Providers({ children, session }) {
//   return (
//     // <SessionProvider session={session}>
//     <ItemQuantityeContext>
//       <CartContextProvider>{children}</CartContextProvider>
//     </ItemQuantityeContext>
//     // </SessionProvider>
//   );
// }

export default function Providers({ children }) {
  return (
    <SessionProvider>
    <Provider store={store}>{children}</Provider>
     </SessionProvider>
  );
}
