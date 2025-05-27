const Todo = require("../model/todo");

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({});
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTodo = async (req, res) => {
  try {
    const createTodo = await Todo.create(req.body);
    res.status(201).json(createTodo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const singleTodo = async (req, res) => {
  try {
    const { id: todoID } = req.params;
    const getSingleTodo = await Todo.findOne({ _id: todoID });
    res.status(200).json(getSingleTodo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id: todoID } = req.params;
    const deleteTodo = await Todo.findOneAndDelete({ _id: todoID });
    res.status(200).json({ deleteTodo });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id: todoID } = req.params;
    const updateTodo = await Todo.findByIdAndUpdate({ _id: todoID }, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ message: "data has been updated", data: updateTodo });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  singleTodo,
  deleteTodo,
  updateTodo,
};
