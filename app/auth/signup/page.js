"use client";
import Input from "@/components/Input";
import { signUpSchema } from "@/lib/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // Validate the data using signUpSchema
    const validationResult = signUpSchema.safeParse(data);

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.reduce(
        (acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        },
        {}
      );
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/signup`, {
        method: "POST",
        body: formData,
      });
      const responseData = await res.json();
      toast(responseData.message);
      // clear formdata
      if (res.status === 201) {
        formRef.current.reset();
        setErrors({});
      }
      router.push('/auth/signin')
    } catch (error) {
      // console.log("Error", error);
      return toast("Internal Server Error");
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border border-gray-300 rounded-md shadow py-3 px-5">
        <div className="text-center pb-5">
          <h1 className="py-3 text-2xl">Sign Up</h1>
          <p>Please enter your information to create an account</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit} ref={formRef}>
          <Input type="text" name="username" />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          <Input type="email" name="email" />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <Input type="password" name="password" />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <Input type="password" name="passwordConfirm" className="mb-3" />
          {errors.passwordConfirm && (
            <p className="text-red-500">{errors.passwordConfirm}</p>
          )}
          <input
            type="submit"
            value="Create an account"
            className="my-3 rounded py-2 bg-black opacity-90 text-white font-semibold"
          />
        </form>
        <p className="text-center pt-3">
          Already have an account?{" "}
          <Link href="/auth/signin" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
