import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({

    event:{
        type:String,
        
    },
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type: String,
        required: [true , "password is require"],
        unique: true,
    }

})

export const  Booking = mongoose.model("Booking" , bookingSchema)