import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
      required: true,
    },

    houseNo: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { timestamps: true }
);

export const Address = mongoose.model("address", addressSchema);


