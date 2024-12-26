import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentStatus: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
