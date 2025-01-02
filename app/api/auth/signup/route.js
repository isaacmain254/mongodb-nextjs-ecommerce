import { signUpSchema } from "@/lib/zod";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password-hash";
import dbConnect from "@/lib/mongoose/dbConnect";

export async function POST(req) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  // Validate the data using signUpSchema
  const validationResult = signUpSchema.safeParse(data);

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => err.message);
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const { username, email, password, passwordConfirm } = validationResult.data;

  if (password !== passwordConfirm) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 }
    );
  }
  try {
    dbConnect();
    const hashedPassword = await hashPassword(password);
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }

    await User.create(newUser);
    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
