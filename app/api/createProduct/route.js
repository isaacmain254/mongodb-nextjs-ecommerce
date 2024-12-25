import dbConnect from "@/lib/mongoose/dbConnect";
import Brand from "@/models/product";

import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  try {
    await dbConnect();
    const product = await Brand.create(data);
    console.log(product);
    return NextResponse.json({ product });
  } catch (error) {
    console.log(error.message);
  }
}
