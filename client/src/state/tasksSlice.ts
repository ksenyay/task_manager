import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TaskCard } from "../types";
import {
  changeColumn,
  createTask,
  deleteTask,
  editTask,
  getTasksByBoard,
} from "../api/taskApi";

// Thunks
export const addCard = createAsyncThunk(
  "tasks/create",
  (task: {
    boardId: string;
    title: string;
    description: string;
    column: string;
  }) => {
    return createTask(task);
  },
);

export const fetchTasksById = createAsyncThunk(
  "tasks/fetchById",
  (id: string) => {
    return getTasksByBoard(id);
  },
);

export const deleteCard = createAsyncThunk("tasks/delete", (id: string) => {
  return deleteTask(id);
});

export const editCard = createAsyncThunk(
  "tasks/edit",
  ({ id, update }: { id: string; update: Partial<TaskCard> }) => {
    return editTask(id, update);
  },
);

export const changeTaskColumn = createAsyncThunk(
  "tasks/changeColumn",
  ({ id, column }: { id: string; column: string }) => {
    return changeColumn(id, column);
  },
);

interface TasksState {
  tasks: TaskCard[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateLocalColumn: (state, action) => {
      const { id, column } = action.payload;
      const task = state.tasks.find((task) => task._id === id);
      if (task) {
        task.column = column;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasksById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksById.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tasks";
      })

      // Add card
      .addCase(addCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create task";
      })

      // Delete card
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload._id,
        );
        state.loading = false;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete task";
      })

      // Edit card
      .addCase(editCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to edit task";
      })

      // Change column
      .addCase(changeTaskColumn.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updated._id);
        if (index !== -1) {
          state.tasks[index] = updated;
        }
      });
  },
});

export default tasksSlice.reducer;
