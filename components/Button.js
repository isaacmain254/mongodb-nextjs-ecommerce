import Link from "next/link";
import React from "react";

function Button({ uri, children }) {
  return (
    <>
      <button className="bg-black opacity-80  rounded py-3 px-6 hover:shadow-md hover:shadow-black">
        <Link
          href={uri}
          className="text-white text-base font-light font-sans text-center"
        >
          {children}
        </Link>
      </button>
    </>
  );
}

export default Button;
