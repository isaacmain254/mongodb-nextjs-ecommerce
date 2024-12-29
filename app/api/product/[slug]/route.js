import dbConnect from "@/lib/mongoose/dbConnect";
import Product from "@/models/product";
import Brand from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const slug = (await params).slug;
  console.log("slug", slug);
  if (!slug) {
    return new Response("Invalid product slug", { status: 400 });
  }
  try {
    await dbConnect();

    const product = await Product.findOne({ slug });
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.log(error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}
