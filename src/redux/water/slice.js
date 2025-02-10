import { createSlice } from '@reduxjs/toolkit';
import { fetchWaterToday, fetchWaterMonth, addWater, deleteWater, updateWater, dailyNormUpd } from './operations';
// import { login, logout, refreshUser, register } from '../auth/operations';

const initialState = {
  today: [],
  month: [],
  dailyNorm: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action, key) => {
  state.loading = false;
  state.error = null;
  state[key] = action.payload;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Today
      .addCase(dailyNormUpd.pending, handlePending)
      .addCase(dailyNormUpd.fulfilled, (state, action) => handleFulfilled(state, action, 'dailyNorm'))
      .addCase(dailyNormUpd.rejected, handleRejected)

      
      .addCase(fetchWaterToday.pending, handlePending)
      .addCase(fetchWaterToday.fulfilled, (state, action) => handleFulfilled(state, action, 'today'))
      .addCase(fetchWaterToday.rejected, handleRejected)
      
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => handleFulfilled(state, action, 'today'))
      .addCase(addWater.rejected, handleRejected)
      
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => handleFulfilled(state, action, 'today'))
      .addCase(deleteWater.rejected, handleRejected)
      
      .addCase(updateWater.pending, handlePending)
      .addCase(updateWater.fulfilled, (state, action) => handleFulfilled(state, action, 'today'))
      .addCase(updateWater.rejected, handleRejected)
      
      // Month
      .addCase(fetchWaterMonth.pending, handlePending)
      .addCase(fetchWaterMonth.fulfilled, (state, action) => handleFulfilled(state, action, 'month'))
      .addCase(fetchWaterMonth.rejected, handleRejected);
  },
});


export default waterSlice.reducer;
