"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";

export const login = async (formData) => {
  try {
    // Validate the form data using signInSchema
    const validationResult = signInSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.reduce(
        (acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        },
        {}
      );
      return {
        type: "ERROR",
        message: "Validation failed",
        errors: validationErrors,
      };
    }
    const { email, password } = validationResult.data;
    console.log("email", email);
    console.log("password", password);
    // signIn with credentials
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    if (result.error) {
      return { type: "ERROR", message: `Log in failed: ${result.error}` };
    }

    return { type: "SUCCESS", message: "Logged in successfully" };
    // const validatedFields = signInSchema.safeParse(formData);
    // const LogInFormData = signInSchema.parse(formData);
    // const email = LogInFormData.email;
    // const password = LogInFormData.password;
    // console.log("LogInFormData", LogInFormData);
    // signIn with credentials
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   callbackUrl: "/",
    //   email,
    //   password,
    // });

    // if (result.error) {
    //   return { type: "ERROR", message: `Log in failed: ${result.error}` };
    // }
    // console.log("login form data", LogInFormData);
    // return { type: "SUCCESS", message: "Logged in successfully" };
  } catch (error) {
    return {
      type: "ERROR",
      message: `Something went wrong please try again, ${error.message}`,
    };
  }
};
