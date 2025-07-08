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
}

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
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
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(board => board._id !== action.payload);
        if (state.currentBoard?._id === action.payload) {
          state.currentBoard = null;
        }
      })
      .addCase(patchBoard.fulfilled, (state, action) => {
        const index = state.boards.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
        if (state.currentBoard?.id === action.payload.id) {
          state.currentBoard = action.payload;
        }
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.currentBoard = action.payload;
      });
  },
});

export const { setCurrentBoard, clearCurrentBoard } = boardsSlice.actions;
export default boardsSlice.reducer;