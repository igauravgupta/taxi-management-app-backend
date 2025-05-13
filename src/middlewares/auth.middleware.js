import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {BlackListToken} from "../models/blackListToken.model.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
   
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (await BlackListToken.findOne({ token })) {
      console.log("Token is blacklisted");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// authorizing caption
const authCaption = async(req,res,next)=>{
    try {
      const token =req.cookies.token || req.headers.authorization?.split(" ")[1];
      if(!token){
        return res.status(401).json({message:"Unauthorized"});
      }
      if(await BlackListToken.findOne({token})){
        return res.status(401).json({message:"Unauthorized"});
      }
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      const caption = await Caption.findById(decoded.id);
      if(!caption){ 
        return res.status(401).json({message:"Unauthorized"});
      }
      req.caption = caption;  
      next();   
    } catch (error) {
      return res.status(401).json({message:"Unauthorized"});
    }
}

export {authUser,authCaption};
