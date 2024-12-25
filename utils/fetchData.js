import dbConnect from "@/lib/mongoose/dbConnect";
import Brand from "@/models/product";

export async function getData() {
  await dbConnect();
  const data = await Brand.find();
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }
  return data.json();
}
