import mongoose from "mongoose";

const concertSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

export const concert = mongoose.model("concert", concertSchema);
