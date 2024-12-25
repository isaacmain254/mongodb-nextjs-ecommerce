// import { signOut } from "next-auth/react";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout = () => {
  return (
    <>
      <button
        className="bg-gray-200 border border-gray-200 rounded px-5 py-1  hover:shadow hover:shadow-gray-50"
        // onClick={() => signOut()}
      >
        <LogoutIcon /> logout
      </button>
    </>
  );
};

export default Logout;
