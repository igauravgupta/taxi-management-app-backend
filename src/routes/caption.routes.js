import { Router } from "express";
import { body } from "express-validator";

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

export default router;
