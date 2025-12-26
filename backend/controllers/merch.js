import merch from "../models/merch.model.js"
const merchItem = async (req, res) => {
    
    const data = await merch.find(req.query);
    res.status(200).json(data);

    
      

}

export default merchItem