import Title from "../Title";
import "./home-page.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { PostTodo, getAllTodos, deleteTodo } from "../API/Api";
export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("none");
  const navigate = useNavigate();
  //post todo
  async function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.length > 25) {
      setErrorMsg("block");
      setTimeout(() => {
        setErrorMsg("none");
      }, 3000);
    } else {
      setLoading(true);
      setInputValue("");
      const data = await PostTodo(inputValue);
      console.log(data);
      setData([...Data, data]);
      setLoading(false);
    }
  }

  //get all todos
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTodos();
      setData(data);
    };
    fetchData();
  }, []);

  // delete todo
  const handleDelete = async (id) => {
    await deleteTodo(id);
    const newListTodos = Data.filter((item) => item._id !== id);
    setData(newListTodos);
  };
  return (
    <div className="home-route">
      <Title />
      <div className="parent-form">
        <form className="add-todo-form" onSubmit={handleSubmit}>
          <input
            autoComplete="off"
            type="text"
            name="addTodo"
            placeholder="Create New Todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
      <p className="loading-msg">
        {loading ? <Spinner animation="border" variant="warning" /> : ""}
      </p>
      <p className="error-msg" style={{ display: errorMsg }}>
        Your Text is more than 25 Characters
      </p>
      <div className="output">
        <ul className="todos-list">
          {Data?.map(({ todo, _id }) => {
            return (
              <li key={_id}>
                <span>{todo}</span>
                <div>
                  <NavLink to={`/edit/${_id}`} state={{ todo, _id }}>
                    <FontAwesomeIcon
                      onClick={() => navigate("/edit/first")}
                      className="edit-icon"
                      icon={faPenToSquare}
                    />
                  </NavLink>
                  <FontAwesomeIcon
                    onClick={() => handleDelete(_id)}
                    className="delete-icon"
                    icon={faTrashCan}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <AddTodos />
      <TodoOutput /> */}
    </div>
  );
}
