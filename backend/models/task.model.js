import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'], 
    minlength: [3, 'Title must be at least 3 characters long'] 
  },
  description: { 
    type: String, 
    minlength: [10, 'Description must be at least 10 characters long'] 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  dueDate: { 
    type: Date, 
    required: [true, 'Due date is required'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Task = mongoose.model('Task', taskSchema);