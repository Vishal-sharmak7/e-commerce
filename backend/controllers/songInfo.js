import { Songs } from "../models/songs.model.js"
const songInfo = async (req , res)=>{
     const data = await Songs.find()
     res.status(200).json(data)
}
export default songInfo