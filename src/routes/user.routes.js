import { Router } from "express";
import { signup } from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
  ],
  signup
);

export default router;
