import React, { useContext, useState, useEffect } from "react";
import oy from "../assets/images/oy.svg";
import headerLight from "../assets/images/headerLight.jpeg";
import headerDark from "../assets/images/headerDark.jpeg";
import pathInAc from "../assets/images/pathInActive.svg";
import pathActive from "../assets/images/pathActive.svg";
import "../styles/components.css";
import { TodoContext } from "../components/TodoContext";

const Todo: React.FC = () => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("TodoContext must be used within a TodoProvider");
  }
  const { todos, addTodo, removeTodo } = todoContext;
  const [newTodo, setNewTodo] = useState<string>("");
  const [headerImage, setHeaderImage] = useState(headerLight);
  const [activeIcons, setActiveIcons] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const savedIcons = localStorage.getItem("activeIcons");
    if (savedIcons) {
      setActiveIcons(JSON.parse(savedIcons));
    } else {
      setActiveIcons(todos.map(() => pathInAc));
    }
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("activeIcons", JSON.stringify(activeIcons));
  }, [activeIcons]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setActiveIcons((prevIcons) => [...prevIcons, pathInAc]);
      setNewTodo("");
    }
  };

  const handleImageClick = () => {
    setHeaderImage((prevImage) =>
      prevImage === headerLight ? headerDark : headerLight
    );
  };

  const handleIconClick = (index: number) => {
    setActiveIcons((prevIcons) =>
      prevIcons.map((icon, i) =>
        i === index ? (icon === pathInAc ? pathActive : pathInAc) : icon
      )
    );
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter(
      (_, index) => activeIcons[index] === pathInAc
    );
    const newActiveIcons = activeIcons.filter((icon) => icon === pathInAc);
    const indicesToRemove = todos
      .map((_, index) => (activeIcons[index] === pathActive ? index : -1))
      .filter((index) => index !== -1);

    indicesToRemove.reverse().forEach((index) => removeTodo(index));
    setActiveIcons(newActiveIcons);
  };

  const filteredTodos = todos.filter((_, index) => {
    if (filter === "All") return true;
    if (filter === "Active") return activeIcons[index] === pathInAc;
    if (filter === "Completed") return activeIcons[index] === pathActive;
    return true;
  });

  return (
    <>
      <div className="todoBar">
        <div
          className="header"
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          <div className="headerTitle">
            <h1 onClick={handleImageClick}>T O D O</h1>
            <img
              src={oy}
              alt="oy"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
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
            <div className="Todo">
          <ul>
            {filteredTodos.map((todo, index) => (
              <li key={index}>
                <img
                  src={activeIcons[index]}
                  alt="status"
                  onClick={() => handleIconClick(index)}
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    width: "24px",
                    height: "24px",
                  }}
                />
                <span className="todoText">{todo}</span>
                <button onClick={() => removeTodo(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="todoBottom">
            <div className="itemsLeft">
              <span>
                {activeIcons.filter((icon) => icon === pathInAc).length} items
                left
              </span>
            </div>
            <div className="categories">
              <span className="categoriesText" onClick={() => setFilter("All")}>
                All
              </span>
              <span
                className="categoriesText"
                onClick={() => setFilter("Active")}
              >
                Active
              </span>
              <span
                className="categoriesText"
                onClick={() => setFilter("Completed")}
              >
                Completed
              </span>
            </div>
            <div className="clear">
              <span
                onClick={handleClearCompleted}
                style={{ cursor: "pointer" }}
              >
                Clear Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
