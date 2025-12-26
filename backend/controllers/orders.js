import Order from "../models/order.js";

import mongoose from "mongoose";

// GET all orders by user
export const getOrderDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "merches",
          localField: "items.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $lookup: {
          from: "addresses", // Assuming you have a separate addresses collection
          localField: "userId",
          foreignField: "userId",
          as: "address",
        },
      },
      {
        $unwind: {
          path: "$address",
          preserveNullAndEmptyArrays: true, // In case no address is found
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          totalAmount: { $first: "$totalAmount" },
          paymentId: { $first: "$paymentId" },
          receipt: { $first: "$receipt" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          address: { $first: "$address" },
          items: {
            $push: {
              productId: "$items.productId",
              quantity: "$items.quantity",
              productName: "$productInfo.name",
              price: "$productInfo.price",
              image: "$productInfo.image",
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error in aggregation:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getOrderDetails;
