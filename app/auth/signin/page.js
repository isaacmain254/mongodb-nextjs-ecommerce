import Input from "@/components/Input";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border border-gray-300 rounded-md shadow py-3 px-5 w-96">
        <div className="text-center pb-5">
          <h1 className="py-3 text-2xl">Sign In</h1>
          <p>Please enter your information to login</p>
        </div>
        <form className="flex flex-col">
          <Input type="email" name="Email" />
          <Input type="password" name="password" className="mb-3" />
          <input
            type="submit"
            value="Login"
            className="my-3 rounded py-2 bg-black opacity-90 text-white"
          />
        </form>
        <p className="text-center pt-3">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
