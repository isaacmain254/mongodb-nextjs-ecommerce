import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/mongoose/dbConnect";
import Brand from "@/models/product";

import { NextResponse } from "next/server";

export async function POST(request) {
  // const data = await request.json();
  // console.log("data", data);
  try {
    const data = await request.json();
    console.log("data", data);

    // Ensure the image data is provided
    if (!data.image) {
      return NextResponse.json(
        { message: "No image data provided" },
        { status: 400 }
      );
    }

    // Upload the image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Cloudinary upload failed"));
          } else {
            resolve(result);
          }
        }
      );

      // Decode the base64 image and pass it to the upload stream
      const buffer = Buffer.from(data.image, "base64");
      uploadStream.end(buffer);
    });

    console.log("uploadResult", uploadResult);
    // await dbConnect();

    // const product = await Brand.create(data);
    // console.log(product);
    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Failed to add product", error: error.message },
      { status: 500 }
    );
  }
}
