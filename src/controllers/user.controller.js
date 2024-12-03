import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asynchandler.js";

const signup = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
  const user = await User.create({ fullName, email, password });
  if (!user) {
    return res.status(500).json({ message: "Failed to create user" });
  }
  const token = await user.generateToken();
  return res
    .status(201)
    .json({ message: "User created successfully", token, user });
});
export { signup };
