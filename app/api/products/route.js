// get all products from mongodb

import dbConnect from "@/lib/mongoose/dbConnect";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
