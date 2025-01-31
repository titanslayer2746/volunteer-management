import express from 'express';
import { getMe, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

//logout
router.post('/logout', logoutUser)

router.get("/me", protectRoute, getMe);

export default router;