import dbConnect from "@/lib/mongoose/dbConnect";
import Brand from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const Slug = searchParams.get("slug");
    console.log(Slug);
    // const Slug = request.params;
    // console.log(Slug);
    const product = await Brand.findOne({ " slug": Slug });
    if (product != null) return NextResponse.json({ product });
    return NextResponse.json({ message: "Product not found" });
    // return NextResponse.json({ res });
  } catch (error) {
    console.log(error.message);
  }
}
