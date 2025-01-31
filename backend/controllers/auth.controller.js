import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


const registerUser = async (req, res) => {
    try {
      // Create new user
      const user = new User(req.body);
      await user.save();
  
      // Generate JWT
      const token = jwt.sign(
        { _id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      res.header('Authorization', token).send({ user, token });
    } catch (err) {
      // Handle Mongoose validation errors
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).send(errors);
      }
      res.status(400).send(err);
    }
  };

const loginUser = async (req, res) => {
    try {
      // Check if user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send('Invalid email or password');
  
      // Validate password
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send('Invalid email or password');
  
      // Generate JWT
      const token = jwt.sign(
        { _id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      res.header('Authorization', token).send({ user, token });
    } catch (err) {
      res.status(400).send(err);
    }
  }



  export {registerUser, loginUser}