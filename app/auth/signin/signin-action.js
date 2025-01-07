"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { fromError } from "zod-validation-error";
// import User from "@/models/user";
import dbConnect from "@/lib/mongoose/dbConnect";

export const login = async (formData) => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log("Raw data", rawData);
  // const validationResult = signInSchema.safeParse(rawData);

  // if (!validationResult.success) {
  //   const errorMessage = fromError(validationResult.error);
  //   return {
  //     success: false,
  //     message: "Validation failed",
  //     errors: validationResult.error.flatten().fieldErrors,
  //   };
  // }

  // const validData = validationResult.data;
  try {
    // Validate the form data using signInSchema
    // const validationResult = signInSchema.safeParse(
    //   Object.fromEntries(formData)
    // );
    // if (!validationResult.success) {
    //   const validationErrors = validationResult.error.errors.reduce(
    //     (acc, err) => {
    //       acc[err.path[0]] = err.message;
    //       return acc;
    //     },
    //     {}
    //   );
    //   return {
    //     type: "ERROR",
    //     message: "Validation failed",
    //     errors: validationErrors,
    //   };
    // }
    // const { email, password } = validationResult.data;
    // console.log("email", email);
    // console.log("password", password);
    // signIn with credentials
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   callbackUrl: "/",
    //   email: rawData.email,
    //   password: rawData.password,
    // });

    // if (result.error) {
    //   return { type: "ERROR", message: `Log in failed: ${result.error}` };
    // }

    // return { type: "SUCCESS", message: "Logged in successfully" };
    // const validatedFields = signInSchema.safeParse(formData);
    // const LogInFormData = signInSchema.parse(formData);
    // const email = LogInFormData.email;
    // const password = LogInFormData.password;
    // console.log("LogInFormData", LogInFormData);
    // signIn with credentials
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: rawData.email,
      password: rawData.password,
    });

    if (result.error) {
      return { type: "ERROR", message: `Log in failed: ${result.error}` };
    }
    // console.log("login form data", LogInFormData);
    // return { type: "SUCCESS", message: "Logged in successfully" };
    // await dbConnect();
    // const user = await User.findOne({ email: rawData.email });
    // console.log("user from the db", user);
    return { success: true, message: "Form submitted successfully" };
  } catch (error) {
    // return {
    //   type: "ERROR",
    //   message: `Something went wrong please try again, ${error.message}`,
    // };
    console.log("Error", error);
    return {
      success: false,
      message: "Failed to submit form",
      errors: { submit: ["Server error occurred"] },
    };
  }
};
