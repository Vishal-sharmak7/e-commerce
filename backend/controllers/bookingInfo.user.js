import { Booking } from "../models/booking.user.model.js";


const bookingInfo = async (req, res) => {
   const { event, name, age, email } = req.body;

   if (!event || !name || !age || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
  

   try {
      const newBooking = new Booking({
         event,
         name,
         age,
         email,
       });
  
      await newBooking.save();
  
      res.status(200).json(newBooking); // Send back the saved booking
    } catch (error) {
      console.error("Error while booking:", error);
      res.status(500).json({ message: "Booking failed", error });
    }
  };


export default bookingInfo;
