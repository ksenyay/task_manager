import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Board } from '../types';
import {
  getAllBoards,
  addNewBoard,
  updateBoard,
  deleteBoard,
  getBoardById,
} from '../api/boardApi';

// Thunks
export const fetchBoards = createAsyncThunk('boards/fetchAll', async () => {
  return await getAllBoards();
});

export const fetchBoardById = createAsyncThunk('boards/fetchById', async (id: string) => {
  return await getBoardById(id);
});

export const createBoard = createAsyncThunk(
  'boards/create',
  async (board: { id: string; name: string }) => {
    return await addNewBoard(board);
  }
);

export const patchBoard = createAsyncThunk(
  'boards/update',
  async ({ id, update }: { id: string; update: Partial<Board> }) => {
    return await updateBoard(id, update);
  }
);

export const removeBoard = createAsyncThunk(
  'boards/delete',
  async (id: string) => {
    await deleteBoard(id);
    return id;
  }
);

interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
    clearCurrentBoard(state) {
      state.currentBoard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all boards
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch boards';
      })

      // Fetch board by id
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.currentBoard = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch board';
      })

      // Create board
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
        state.loading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to create board';
      })

      // Update board
      .addCase(patchBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchBoard.fulfilled, (state, action) => {
        const index = state.boards.findIndex(board => board.id === action.payload.id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
        if (state.currentBoard?.id === action.payload.id) {
          state.currentBoard = action.payload;
        }
        state.loading = false;
      })
      .addCase(patchBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to update board';
      })

      // Delete board
      .addCase(removeBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(board => board.id !== action.payload);
        if (state.currentBoard?.id === action.payload) {
          state.currentBoard = null;
        }
        state.loading = false;
      })
      .addCase(removeBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete board';
      });
  },
});

export const { setCurrentBoard, clearCurrentBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
