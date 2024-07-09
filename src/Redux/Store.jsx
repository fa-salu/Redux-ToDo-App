import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from '../Todo/TodoSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
