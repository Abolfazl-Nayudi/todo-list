import axios from "axios";

const baseUrl = "http://localhost:4000/todos/";

const PostTodo = async (data) => {
  const res = await axios.post(baseUrl, { todo: data });
  return res.data;
};

const getAllTodos = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getSingleTodo = async (id) => {
  const res = await axios.get(baseUrl + id);
  return res;
};

const updateTodo = async (id, data) => {
  const res = await axios.patch(baseUrl + id, { todo: data });
  return res;
};

const deleteTodo = async (id) => {
  const res = await axios.delete(baseUrl + id);
  return res;
};
export { PostTodo, getAllTodos, getSingleTodo, updateTodo, deleteTodo };
