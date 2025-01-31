import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

// Authentication middleware
export const protectRoute = async (req,res,next) => {
  try {
      const token = req.cookies.jwt;
      
      if(!token) {
          return res.status(401).json({message: "You are not authenticated"})
      }
  
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  
      if(!decodedToken) {
          return res.status(401).json({message: "Token is expired"})
      }
      
      const user = await User.findById(decodedToken.userId).select("-password")
  
      if(!user){
          return res.status(404).json({message: "User not found"})
      }
  
      req.user = user
      next()
  } catch (error) {
      console.log("Error in protectRoute middleware", error)
      return res.status(500).json({message:"Internal Server Error"})
  }
}



// Role checking middleware
export const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send('Access denied');
  }
  next();
};