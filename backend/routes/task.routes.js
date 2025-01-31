import express from 'express';
import { createTask, 
         deleteTasks, 
         getAssignedTasks, 
         getTasks, 
         updateTasks } from '../controllers/task.controller.js';
import { checkRole, protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router(); 

// Create task (Admin only)
router.post('/', protectRoute, checkRole(['admin']), createTask);

// Get all tasks (Admin and User)
router.get('/', protectRoute, getTasks);

// Get tasks assigned to the logged-in user (Volunteers)
router.get('/assigned', protectRoute,getAssignedTasks);

// Update task (Admin only)
router.put('/:id', protectRoute, checkRole(['admin']), updateTasks);

// Delete task (Admin only)
router.delete('/:id', protectRoute, checkRole(['admin']), deleteTasks);

export default router;