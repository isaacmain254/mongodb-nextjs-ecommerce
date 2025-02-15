// export { auth } from "@/auth";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/admin"];

export const config = {
  unstable_allowDynamic: [
    //TODO: use a  glob to allow anything in the next-auth library only instead of the whole node_modules
    // use a glob to allow anything in the function-bind 3rd party module
    "**/node_modules/**",
  ],
};

export default auth(async (req) => {
  const session = await auth();

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix)
  );

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL("/auth/signin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
});
