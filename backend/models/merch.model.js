import mongoose from "mongoose"


const merchSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    
    
    price:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

 const merch = mongoose.model("merch" , merchSchema)

 export default merch