import express, { Router } from "express"
import concertInfo from "../controllers/concert.user.js"
import merchItem from "../controllers/merch.js"
import songInfo from "../controllers/songInfo.js"
import bookingInfo from "../controllers/bookingInfo.user.js"

import userAuth from "../controllers/useregister.js"
import validations  from "../middlewares/AuthValidation.js"
import cartController from "../controllers/cartController.js"
import auth from "../middlewares/auth.js"
import handleAddress from "../controllers/handleAddress.js"



const router  = express.Router()

router.route("/").get(concertInfo)
router.route("/merch").get(merchItem)
router.route("/songs").get(songInfo)
router.route("/booking").post(bookingInfo)
router.route("/register").post(validations.registerValidation, userAuth.userregister)
router.route("/login").post(validations.loginValidation, userAuth.userlogin )
router.route("/add").post(cartController.handleCart);
router.route("/cart/:userId").get(cartController.handleGetCart); 
router.route("/cart/update").put(cartController.handleUpdate); 
router.route("/cart/remove").delete(cartController.handleRemove);  
router.route("/cart/delete/:userId").delete(cartController.handledeleteCart); 
router.route("/address").post(handleAddress);

export default router
