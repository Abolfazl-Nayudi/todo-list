import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditTodo from "./components/EditTodo";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="background">
      <div className="parent">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
