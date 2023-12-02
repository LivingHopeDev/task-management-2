const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

var task = mongoose.model("task", taskSchema);

module.exports = task;
