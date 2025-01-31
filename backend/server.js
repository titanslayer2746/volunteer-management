import dotenv from "dotenv";
import express from 'express';
import cors from "cors";
import authRouter from "./routes/auth.routes.js"
import taskRouter from "./routes/task.routes.js"
import userRouter from "./routes/user.routes.js"
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";

dotenv.config({
  path: './backend/.env'
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Cookie Parsing

app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
}
);