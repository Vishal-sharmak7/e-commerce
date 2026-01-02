import dotenv from "dotenv";
import express from "express";
import connectdb from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config({
  path: "./.env",
});
connectdb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

import router from "./routes/concert.js";


app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log("sever started at port " + process.env.PORT);
});
