const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    maxlength: [25, "your todo is higher that 25 chracters"],
    required: [true, "you must write a todo"],
    trim: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
