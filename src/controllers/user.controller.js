import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asynchandler.js";
import { BlackListToken } from "../models/blackListToken.model.js";

const signup = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ fullName, email, password });
  if (!user) {
    return res.status(500).json({ message: "Failed to create user" });
  }
  const token = await user.generateToken();
  return res
    .status(201)
    .json({ message: "User created successfully", token, user });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = await user.generateToken();
  res.cookie("token", token, {
  httpOnly: true,
  secure: true, // use only if you're using HTTPS
  sameSite: "Strict" // adjust as needed
});

return res.status(200).json({ message: "Login successful", token, user });

});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
});

const logout = asyncHandler(async (req, res) => {
 
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlackListToken.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
});

export { signup, login, getUserProfile, logout };
