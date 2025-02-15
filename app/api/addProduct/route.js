import dbConnect from "@/lib/mongoose/dbConnect";
import Product from "@/models/product";
import cloudinary from "@/utils/cloudinary";
import multer from "multer";
import { NextResponse } from "next/server";

// configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const images = formData.getAll("images");
    console.log(images);
    if (!images || images.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const imageUrls = [];
    for (const image of images) {
      const buffer = await image.arrayBuffer();
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "E-commerce" },
          (error, result) => {
            if (error) {
              reject(new Error("Cloudinary upload failed"));
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(Buffer.from(buffer));
      });
      imageUrls.push(uploadResult.secure_url);
    }

    console.log("upload result", imageUrls);
    const newProduct = new Product({
      ...Object.fromEntries(formData),
      images: imageUrls,
    });

    await newProduct.save();

    return NextResponse.json({
      message: "Product data uploaded successfully",
      data: newProduct,
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
