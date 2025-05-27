const express = require("express");
const {
  getAllTodos,
  createTodo,
  singleTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos");
const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(singleTodo).delete(deleteTodo).patch(updateTodo);
module.exports = router;
