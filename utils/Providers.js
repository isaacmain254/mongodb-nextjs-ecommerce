"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";

// import React from "react";
// // import { SessionProvider } from "next-auth/react";
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
  return <Provider store={store}>{children}</Provider>;
}
