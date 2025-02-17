import React from "react";
import { products } from "./products/page";
import { getOrders } from "@/utils/getOrders";

const Dashboard = async () => {
  const totalProducts = products.length;
  const orders = await getOrders();
  return (
    <div>
      <div className="">
        <h1 className="text-center text-2xl">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gray-100 p-2 rounded-md">
            <h2 className="text-center text-xl">Total Products</h2>
            <p className="text-center text-2xl">{totalProducts}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <h2 className="text-center text-xl">Total Orders</h2>
            <p className="text-center text-2xl">{orders.length}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <h2 className="text-center text-xl">Total Users</h2>
            <p className="text-center text-2xl">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
