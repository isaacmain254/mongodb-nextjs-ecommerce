// get all products from mongodb
import dbConnect from "@/lib/mongoose/dbConnect";
import Brand from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Brand.find();

    return NextResponse.json({ products });
  } catch (error) {
    console.log(error.message);
  }
}
