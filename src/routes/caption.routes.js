import { Router } from "express";
import { body } from "express-validator";
import {createCaption,captionLogin,getCaptionProfile,logoutCaption} from "../controllers/caption.controller.js"
import { authCaption as auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("fullName.firstName").notEmpty().withMessage("First name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("vehicle.vehicleNumber")
      .notEmpty()
      .withMessage("Vehicle number is required"),
    body("vehicle.vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required"),
    body("vehicle.vehicleColor")
      .notEmpty()
      .withMessage("Vehicle color is required"),
  ],
  createCaption
);

router.post("/login",[
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
],captionLogin)

router.get("/profile",auth,getCaptionProfile);
router.get("/logout",auth,logoutCaption);

export default router;
