import dbConnect from "@/lib/mongoose/dbConnect";
import Order from "@/models/order";

export const getOrders = async () => {
  await dbConnect();
  const orders = await Order.find({}).sort({ updatedAt: -1 });
  return orders;
};
