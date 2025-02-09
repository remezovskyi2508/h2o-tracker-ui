import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserInfo,
  resetPassword,
  updateUserAvatar,
  updateUserInfo,
} from './operations.js';

const initialState = {
  userInfo: {},
  loading: false,
  error: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userInfo = action.payload.data;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUserAvatar.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userInfo.avatar = action.payload.avatar;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userInfo = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, state => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const userInfoReducer = userInfoSlice.reducer;
