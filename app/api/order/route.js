import dbConnect from "@/lib/mongoose/dbConnect";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = decodeURIComponent(searchParams.get("session_id"));

  if (!sessionId) {
    return new Response("Session ID is required", { status: 400 });
  }

  try {
    await dbConnect();

    const order = await Order.findOne({ sessionId });

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }
    return Response.json(order);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
