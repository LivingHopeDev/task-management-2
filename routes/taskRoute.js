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
router
  .route("/:id")
  .get(verifyToken, getTask)
  .put(verifyToken, updateTask)
  .delete(verifyToken, deleteTask);
router.route("/:id/set-completed").put(verifyToken, status);
module.exports = router;
