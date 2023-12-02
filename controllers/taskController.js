const Task = require("../model/task");
const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    res.status(200).json({ message: "All fields are required" });
  }
  try {
    const savedTask = await Task.create(req.body);
    return res.status(200).json({ success: true, message: savedTask });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ timestaps: -1 });
    if (tasks.length < 1) {
      return res.status(200).json({ message: "No tasks yet: Add one now" });
    }
    return res.status(200).json({ message: tasks });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getTask = async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);

    return res.status(200).json({ message: tasks });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteTask = (req, res) => {
  console.log("deleteTask");
};

const status = (req, res) => {
  console.log("status");
};

module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
  status,
};
