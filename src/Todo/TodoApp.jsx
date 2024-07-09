import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  selectTodos,
} from './TodoSlice';

const TodoApp = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

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

  return (
    <div>
      <h2>Todo List</h2>
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
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
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
  );
};

export default TodoApp;
