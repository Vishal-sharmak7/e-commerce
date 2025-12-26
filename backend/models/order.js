import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema(
  {
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "usermodel" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "merch" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    paymentId: String,
    receipt: { type: String, unique: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default  mongoose.model("Order" , OrderSchema)