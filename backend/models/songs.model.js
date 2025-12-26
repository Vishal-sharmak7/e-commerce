import mongoose, { Types }  from "mongoose";

const songSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

export const Songs = mongoose.model("Songs " , songSchema)