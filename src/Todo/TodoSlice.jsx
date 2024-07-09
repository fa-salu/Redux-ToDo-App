import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todos.list;
export const todoReducer = todoSlice.reducer;
