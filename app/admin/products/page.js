import Button from "@/components/Button";
import { getProducts } from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = async () => {
  const products = await getProducts();
  return (
    <>
      <Button uri="/admin/products/new">Add Product</Button>
      <div className="w-full overflow-auto mt-3">
        <table className="table-auto text-left w-full">
          <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-4 px-3"></th>
              <th className="py-4 px-3">Product Name</th>
              <th className="py-4 px-3">Category</th>
              <th className="py-4 px-3">Price</th>
              <th className="py-4 px-3">Category</th>
              <th className="py-4 px-3">Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td>No products found.</td>
              </tr>
            )}
            {products.map((product) => (
              <tr className="border-b hover:bg-gray-100" key={product._id}>
                <td className="w-32 py-2 px-3">
                  {product.images.length > 0 && (
                    <Image
                      src={product.images[0]}
                      width={64}
                      height={64}
                      alt={product.name}
                      className="w-fit h-full object-cover aspect-square "
                    />
                  )}
                </td>
                <td className="w-fit py-2 px-3 text-blue-600 underline">
                  <Link href={`/admin/products/${product._id}`}>
                    {product.name}
                  </Link>
                </td>
                <td className="py-2 px-3">{product.category}</td>
                <td className="py-2 px-3">${product.price}</td>
                <td className="py-2 px-3">{product.category}</td>
                <td className="py-2 px-3">{product.stock}</td>
              </tr>
              // </Link>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
