import { createSlice } from '@reduxjs/toolkit';
import { fetchWaterData } from './operations';
// import { login, logout, refreshUser, register } from '../auth/operations';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWaterData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default waterSlice.reducer;
