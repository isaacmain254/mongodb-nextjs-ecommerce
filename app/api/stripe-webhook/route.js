import dbConnect from "@/lib/mongoose/dbConnect";
import Order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  //   handle different events
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      await dbConnect();
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );
        const newOrder = new Order({
          sessionId: session.id,
          email: session.customer_details.email,
          items: lineItems.data.map((item) => ({
            name: item.description,
            amount: item.amount_subtotal / 100,
            quantity: item.quantity,
          })),
          total: session.amount_total / 100,
          currency: session.currency,
          paymentStatus: session.payment_status,
        });

        await newOrder.save();
      } catch (error) {
        console.error("Error saving order:", error);
      }
      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent Succeeded: ", paymentIntent.id);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
