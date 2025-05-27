import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleTodo, updateTodo } from "../API/Api";
import "./edit-todo.css";

export default function EditTodo() {
  const [EditInput, setEditInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("none");
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const getTodo = async () => {
      const res = await getSingleTodo(state._id);
      // console.log(res);
      // console.log(res.data);
      setEditInput(res.data.todo);
    };
    getTodo();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditInput(e.target.editInput.value);
    if (EditInput.length > 25) {
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 2500);
    } else {
      try {
        setLoading(true);
        await updateTodo(state._id, EditInput);
        setLoading(false);
        setEditInput("");
        setSuccessMessage("block");
        setTimeout(() => {
          setSuccessMessage("none");
          navigate("/");
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="edit-todo">
      <h1>EDIT TODO</h1>
      <form className="edit-form" onSubmit={handleEditSubmit}>
        <input
          type="text"
          name="editInput"
          value={EditInput}
          onChange={(e) => setEditInput(e.target.value)}
          placeholder="Edit Todo..."
          autoComplete="off"
        />
        <p className="error-msg-edit">
          {errorMsg ? "Your Text is more than 25 Characters" : ""}
        </p>
        <p className="success-msg" style={{ display: successMessage }}>
          Todo Edited Successfuly
        </p>
        <button type="submit">{loading ? "Loading" : "EDIT"}</button>
      </form>
      <button className="back" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}
