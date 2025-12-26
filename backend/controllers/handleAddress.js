import { Address } from "../models/address.model.js";

const handleAddress = async (req, res) => {
    console.log("handleAddress called")
  try {
    const { userId, houseNo, street, city, state, postalCode, country } = req.body;
    
    const existing = await Address.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "Address already exists for this user" });
    }

    const newAddress = new Address({
      userId,
      houseNo,
      street,
      city,
      state,
      postalCode,
      country,
    });

    await newAddress.save();

    res.status(201).json({ message: "Address saved successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default handleAddress;
