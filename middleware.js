export { auth as middleware } from "@/auth";

export const config = {
  unstable_allowDynamic: [
    //TODO: use a  glob to allow anything in the next-auth library only instead of the whole node_modules
    // use a glob to allow anything in the function-bind 3rd party module
    "**/node_modules/**",
  ],
};