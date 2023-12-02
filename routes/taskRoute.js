const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middleware/auth");
const {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
  status,
} = require("../controllers/taskController");

router.route("/").post(verifyToken, createTask).get(verifyToken, getAllTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
