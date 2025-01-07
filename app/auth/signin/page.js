"use client";
import Input from "@/components/Input";
import { signInSchema } from "@/lib/zod";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { login } from "./signin-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [errors, setErrors] = useState({});
  const formRef = useRef();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("rawData", rawData);
    // e.preventDefault();
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData);

    // Validate the data using signInSchema
    // const validationResult = signInSchema.safeParse(rawData);
    // console.log("validationResult", validationResult);

    // if (!validationResult.success) {
    //   const validationErrors = validationResult.error.errors.reduce(
    //     (acc, err) => {
    //       acc[err.path[0]] = err.message;
    //       return acc;
    //     },
    //     {}
    //   );
    //   console.log("validationErrors", validationErrors);
    //   setErrors(validationErrors);
    //   return;
    // }

    // try {
    const response = await login(formData);
    console.log("response", response);
    toast(response.message);
    // router.push("/");
    if (response.success) {
      // Clear form data and errors
      formRef.current.reset();
      // fo.target.reset();
      // setErrors({});
      router.push("/admin");
    } else if (response.errors) {
      setErrors(response.errors);
    }
    // } catch (error) {
    //   console.log("Error", error);
    //   toast("Something went wrong, please try again.");
    // }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border border-gray-300 rounded-md shadow py-3 px-5 w-96">
        <div className="text-center pb-5">
          <h1 className="py-3 text-2xl">Sign In</h1>
          <p>Please enter your information to login</p>
        </div>
        <form className="flex flex-col" action={handleSubmit} ref={formRef}>
          <Input type="email" name="email" />
          {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
          <Input type="password" name="password" className="mb-3" />
          {/* {errors.password && <p className="text-red-500">{errors.password}</p>} */}
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
