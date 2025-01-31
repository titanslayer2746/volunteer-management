import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
import { User } from "../models/user.model.js"


const registerUser = async (req, res) => {
    try {
      const {name, email, password,role} = req.body
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        return res.status(400).json({message : "Invalid email format"})
    }

      const isEmailExists = await User.findOne({email})

      if(isEmailExists) {
        return res.status(400).json({message : "Email already taken"})
    }

      if(role!=='admin'&&role!=='user'){
        return res.status(400).json({message : "Invalid role"})
    }

      if(password.length<6){
      return res.status(400).json({message : "Password should be at least 6 characters long"})
    }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)

      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword, 
        role     
    })

      await generateTokenAndSetCookie(newUser._id,res)
      await newUser.save()

      return res.status(201).json({
          name,
          email,
          role,
          createdAt : newUser.createdAt
      })
  
    } catch (err) {
         console.error("Error in register controller:", err);
         res.status(500).json({ message: "Internal Server Error" });
    }
  };

const loginUser = async (req, res) => {
    try {
      const { email, password} = req.body;

      // Check if user exists
      console.log("passed 1")
      const user = await User.findOne({email});
      if (!user) return res.status(400).send('Invalid email or password');

      console.log("Passed 2")
      // Validate password
      const isPasswordCorrect = await bcrypt.compare(password, user?.password || "" )
      if (!isPasswordCorrect) return res.status(400).send('Invalid email or password');
  
      // Generate JWT
      console.log("Passed 3")
      await generateTokenAndSetCookie(user._id,res)
      console.log("Passed 4")
      return res.status(201).json({
        name : user.name,
        email,
        role : user.role,
        createdAt : user.createdAt
    })
      
    } catch (err) {
      console.log("Error in login controller")
      res.status(400).send(err);
    }
  }


const logoutUser = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out Successfully"})
    } catch (error) {
        console.log("Error in logout controller", error)
        res.status(500).json({error: "Internal Server Error"});
    }
}

const getMe = async (req,res) =>{
  try {
      const user = await User.findById(req.user._id).select("-password")
      res.status(200).json(user);
  } catch (error) {
      console.log("Error in getMe controller", error)
      res.status(500).json({error: "Internal Server Error"});
  }
}



  export {registerUser, loginUser, logoutUser, getMe}