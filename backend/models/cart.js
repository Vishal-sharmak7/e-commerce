// user id->user -id

// product -> array
// product ->

// qty
// addat

import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "merch" },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "usermodel" },
  items: [cartItemSchema],
  
},
{timestamps:true,}
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

