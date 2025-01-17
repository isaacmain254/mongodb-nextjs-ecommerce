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

export const getProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/products`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.products;
};

export const getProductBySlug = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/${slug}`
  );
  const data = await res.json();
  return data;
};
