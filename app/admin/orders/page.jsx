import Order from "@/models/order";
import Link from "next/link";

const Orders = async () => {
  const orders = await Order.find({}).sort({ updatedAt: -1 });
  console.log("orders", orders);
  return (
    <div className="w-full overflow-auto">
      <table className="table-auto text-left w-full">
        <thead className="text-sm text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="py-4 px-3">Customer Email</th>
            <th className="py-4 px-3">Total Items</th>
            <th className="py-4 px-3">Total Price</th>
            <th className="py-4 px-3">Payment Status</th>
            <th className="py-4 px-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td>No orders found.</td>
            </tr>
          )}
          {orders.map((order) => (
            <tr className="border-b hover:bg-gray-100" key={order._id}>
              <td className="w-fit py-2 px-3 text-blue-600 underline">
                <Link href={`/admin/orders/${order._id}`}>{order.email}</Link>
              </td>
              <td className="py-2 px-2">{order.items.length}</td>
              <td className="py-2 px-3">${order.total}</td>
              <td className="py-2 px-3">{order.paymentStatus}</td>
              <td className="py-2 px-3">
                {new Date(order.updatedAt).toLocaleString()}
              </td>
            </tr>
            // </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
