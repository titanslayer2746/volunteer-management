import express from 'express';
import { checkRole, protectRoute } from '../middlewares/auth.middleware.js';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
const router = express.Router();

// Get all users (Admin only)
router.get('/', protectRoute, checkRole(['admin']), getUsers);

// Get a single user by ID (Admin only)
router.get('/:id', protectRoute, checkRole(['admin']), getUser);

// Update a user (Admin only)
router.put('/:id', protectRoute, checkRole(['admin']), updateUser);

// Delete a user (Admin only)
router.delete('/:id', protectRoute, checkRole(['admin']), deleteUser);

export default router;

