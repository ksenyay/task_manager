import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
