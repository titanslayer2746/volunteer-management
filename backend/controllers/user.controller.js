import { User } from "../models/user.model.js";


const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}


const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // Ensure validation runs on update
      ).select('-password');
  
      if (!user) return res.status(404).send('User not found');
      res.send(user);
    } catch (err) {
      // Handle Mongoose validation errors
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).send(errors);
      }
      res.status(400).send(err);
    }
  }

const deleteUser = async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findById(id);

      if(user.role==="admin") {
        return res.status(403).send("You cannot delete Admins")
      }
      await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.send({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).send(err);
    }
  }

export {getUsers,getUser, updateUser, deleteUser}