import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  selectTodos,
} from "./TodoSlice";
import Todocss from "./Todo.module.css";

const TodoApp = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    dispatch(
      addTodo({
        id: Date.now(),
        text: newTodo,
        completed: false,
      })
    );
    setNewTodo("");
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, text) => {
    setIsEditing(id);
    setEditText(text);
  };

  const handleUpdateTodo = (id) => {
    if (editText.trim() === "") return;
    dispatch(editTodo({
      id,
      text: editText,
    }));
    setIsEditing(null);
    setEditText("");
  };

  return (
    <div className={Todocss.container}>
      <div>
        <h2>Todo List</h2>
      </div>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {isEditing === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdateTodo(todo.id);
                    }}
                    autoFocus
                  />
                  <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                </>
              )}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
