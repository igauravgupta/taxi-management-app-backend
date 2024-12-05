import { Caption } from "../models/caption.model.js";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asynchandler.js";

const createCaption = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, vehicle } = req.body;
  if (await Caption.findOne({ email })) {
    return res.status(400).json({ message: "Caption already exists" });
  }
  const caption = await Caption.create({
    fullName,
    email,
    password,
    vehicle,
  });
  const token = await caption.generateToken();
  res
    .status(201)
    .json({ message: "Caption created successfully", token, caption })
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
});

export default { createCaption };
