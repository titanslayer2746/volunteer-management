import { Task } from "../models/task.model.js";


const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).send(errors);
    }
    res.status(400).send(err);
  }
}


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
}

const getAssignedTasks =  async (req, res) => {
    try {
      const tasks = await Task.find({ assignedTo: req.user._id })
        .populate('assignedTo', 'name email');
      res.send(tasks);
    } catch (err) {
      res.status(500).send(err);
    }
}


const updateTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
}

const deleteTasks = async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.send({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(400).send(err);
    }
  }


export {
    createTask,
    getTasks,
    updateTasks,
    deleteTasks,
    getAssignedTasks
}