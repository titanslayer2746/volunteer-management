import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import authRouter from "./routes/auth.routes.js"
import taskRouter from "./routes/task.routes.js"
import connectDB from "./db/index.js";

dotenv.config({
  path: './backend/.env'
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRouter);
// app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
}
);