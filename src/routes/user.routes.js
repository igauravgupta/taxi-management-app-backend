import { Router } from "express";
import {
  signup,
  login,
  getUserProfile,
  logout,
} from "../controllers/user.controller.js";
import {authCaption as auth} from "../middlewares/auth.middleware.js";
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
router.get(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  login
);

router.get("/getUserProfile", auth, getUserProfile);
router.get("/logout", auth, logout);

export default router;
