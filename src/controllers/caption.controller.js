import { Caption } from "../models/caption.model.js";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asynchandler.js";

// register caption
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

// login caption
const captionLogin=asyncHandler(async(req,res)=>{
  // validation 

  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });
  // get email and password from the request body
  const {email,password}=req.body;
  const caption  = await Caption.findOne({email});
  if(!caption)
    return res.status(401).json({message:"Invalid email or password"});
  // match password
  const isMatched = caption.matchPassword(password);
  if(!isMatched)
    return res.status(401).json({message:"Invalid email or password"});
  // generate token
  const token = await caption.generateToken();
  return res
    .status(200)
    .json({message:"Login successful",token,caption})
    .cookie("token",token);
});

// caption profile
const getCaptionProfile  =asyncHandler(async(req,res)=>{
  const caption = req.caption;
  return res.status(200).json({caption});

})

// logout caption
const logoutCaption = asyncHandler(async (req, res) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlackListToken.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
});

export default { createCaption ,captionLogin,getCaptionProfile,logoutCaption};
