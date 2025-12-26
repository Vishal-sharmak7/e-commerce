import instance from "../config/razorpay.js";
import Order from "../models/order.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
      
    const { totalAmount, items } = req.body;

    const receiptId = `rcpt_${Date.now()}`;

    const options = {
      amount: totalAmount * 100, // amount in paise
      currency: "INR",
      receipt: receiptId,
    };

    const razorpayOrder = await instance.orders.create(options);

    const order = new Order({
      userId:  req.userId, // from auth middleware
      items: items,
      totalAmount,
      receipt: receiptId,
      paymentId: razorpayOrder.id,
    });
    

    await order.save();

    res.status(200).json({ success: true, order, razorpayOrder });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    await Order.findOneAndUpdate(
      { paymentId: razorpay_order_id },
      { status: "paid" }
    );

    res.json({ success: true, message: "Payment verified" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};
