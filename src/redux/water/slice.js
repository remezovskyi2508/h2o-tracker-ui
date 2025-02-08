import { createSlice } from '@reduxjs/toolkit';
import { fetchWaterToday, fetchWaterMonth } from './operations';
// import { login, logout, refreshUser, register } from '../auth/operations';

const initialState = {
  today: [],
  month: [],
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Today
      .addCase(fetchWaterToday.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterToday.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload;
      })
      .addCase(fetchWaterToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Month
      .addCase(fetchWaterMonth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.month = action.payload;
      })
      .addCase(fetchWaterMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default waterSlice.reducer;
