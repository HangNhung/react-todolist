import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  sortCriteria: "All",
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      state.todoList.push({
        ...action.payload,
        completed: false,
        important: false,
      });
    },
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const index = state.todoList.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.todoList[index].task = task;
      }
    },
    toggleCompleted: (state, action) => {
      const index = state.todoList.findIndex(
        (item) => item.id == action.payload
      );
      if (index !== -1) {
        state.todoList[index].completed = !state.todoList[index].completed;
      }
    },
    toggleImportant: (state, action) => {
      const index = state.todoList.findIndex(
        (item) => item.id == action.payload
      );
      if (index !== -1) {
        state.todoList[index].important = !state.todoList[index].important;
      }
    },
  },
});

export const {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
  toggleImportant,
} = TodoSlice.actions;

export default TodoSlice.reducer;
