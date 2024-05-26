import React, { useContext, useState } from "react";
import oy from "../assets/images/oy.svg";
import "../styles/components.css";
import { TodoContext } from "../components/TodoContext";

const Todo: React.FC = () => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("TodoContext must be used within a TodoProvider");
  }
  const { todos, addTodo } = todoContext;
  const [newTodo, setNewTodo] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <>
      <div className="todoBar">
        <div className="header">
          <div className="headerTitle">
            <h1>T O D O</h1>
            <img src={oy} alt="oy" />
          </div>
          <div className="todoCreated">
            <input
            className="addInp"
              type="text"
              placeholder="Create a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
            />
          </div>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
