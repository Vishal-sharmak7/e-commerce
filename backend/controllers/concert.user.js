import {concert} from "../models/concert.model.js";
const concertInfo = async (req, res) => {
  const data = await concert.find(req.query);
  res.status(200).json(data);
  
};

export default concertInfo;
