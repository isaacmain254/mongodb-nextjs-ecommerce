"use client";

import Input from "@/components/Input";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const AddNewProduct = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/addProduct`,
        {
          method: "POST",
          body: formData,
        }
      );
      //   const responseData = await res.json();
      // clear formdata
      if (res.status === 201) {
        formRef.current.reset();
        // setErrors({});
      }
      toast(res.message);
      setLoading(false);
      set;
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
      return toast(error.message);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="w-full lg:w-1/2 mx-auto border border-gray-300 rounded-md mt-3 p-5">
        <h1 className="text-center text-2xl">Add New Product</h1>
        <form className=" flex flex-col" onSubmit={handleSubmit} ref={formRef}>
          <Input type="text" name="name" className="bg-gray-100" />
          {/* <Input type="text" name="category" className="bg-gray-100" /> */}
          {/* select product category */}
          <label htmlFor="category" className="pt-3">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          >
            <option value="Sneakers">Sneakers</option>
            <option value="Boots">Boots</option>
            <option value="Official">Official</option>
            <option value="Loafers">Loafers</option>
            <option value="Scandals">Scandals</option>
            <option value="Casual">Casual</option>
          </select>
          {/* select product label */}
          <label htmlFor="label" className="pt-3">
            Label (optional)
          </label>
          <select
            name="label"
            id="label"
            className="p-2 rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          >
            <option value="new">New</option>
            <option value="hot">Hot</option>
            <option value="featured">Featured</option>
          </select>
          <Input type="number" name="size" className="bg-gray-100" />
          <Input type="number" name="price" className="bg-gray-100" />
          <Input
            type="file"
            accept="image/*"
            name="images"
            className="bg-gray-100"
            multiple
          />
          <input
            type="submit"
            value={loading ? "Submitting..." : "Add Product"}
            className="my-3 rounded py-2 bg-black opacity-90 text-white font-semibold"
          />
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
