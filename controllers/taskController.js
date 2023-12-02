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
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ message: `Task with id: ${id} not found` });
  }
  try {
    await Task.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` });
    }
    await Task.deleteOne({ _id: task._id });
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const status = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` });
    }
    task.completed = !task.completed;
    await task.save();

    if (task.completed) {
      res.status(200).json({ message: "Task completed", task });
    } else {
      res.status(200).json({ message: "Task not completed", task });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
  status,
};
