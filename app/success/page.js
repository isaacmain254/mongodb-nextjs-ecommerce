"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Success = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const sessionId = decodeURIComponent(searchParams.get("session_id"));

  useEffect(() => {
    const fetchOrder = async () => {
      if (sessionId) {
        const res = await fetch(`/api/order?session_id=${sessionId}`);
        const data = await res.json();
        setOrder(data);
        console.log("Order", data);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center text-center">
      <div>
        <p>Thank you for your purchase!</p>
        <h1 className="font-semibold py-3">Order Summary</h1>
        <table className="table-auto text-left">
          <thead className="text-sm text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Unit Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order?.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">{item.amount / item.quantity}</td>
                <td className="px-6 py-3">{item.quantity}</td>
                <td className="px-6 py-3">${item.amount}</td>
              </tr>
            ))}
            <tr className="border-b border-gray-300">
              <td className="px-6 py-3">Total</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">${order?.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Success />
    </Suspense>
  );
};
export default SuccessPage;
