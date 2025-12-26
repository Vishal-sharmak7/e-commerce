import { usermodel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "you are already registered you can login" });
    }

    const newUser = new usermodel({
      name,
      email,
      password,
    });
    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();
    res.status(201).json({
      message: "user register successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMsg = "Authentication is fail";

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isequal = await bcrypt.compare(password, user.password);

    if (!isequal) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwttoken = jwt.sign({ email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        {expiresIn: "24h"}
    );

    res.status(200).json({
      message: "login successfully",
      success: true,
      jwttoken,
      email,
      name:user.name,
       _id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export default { userregister, userlogin };
