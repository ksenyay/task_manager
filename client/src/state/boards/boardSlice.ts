import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Board } from '../../types';

// Fetch boards from backend
export const fetchBoards = createAsyncThunk('boards/fetchAll', async () => {
  const res = await fetch('http://localhost:3000/api/boards');
  if (!res.ok) throw new Error('Failed to fetch boards');
  return (await res.json()) as Board[];
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [] as Board[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBoards.fulfilled, (_, action) => action.payload);
  },
});

export default boardsSlice.reducer;
