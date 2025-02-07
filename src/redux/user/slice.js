import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserInfo,
  updateUserAvatar,
  updateUserInfo,
  updateUserPassword,
} from './operations.js';

const initialState = {
  userInfo: {
    avatar: null,
    name: '',
    email: '',
    gender: '',
  },
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
        state.userInfo.name = action.payload.name;
        state.userInfo.email = action.payload.email;
        state.userInfo.gender = action.payload.gender;
        state.userInfo.avatar = action.payload.avatar;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.userInfo.name = action.payload.name;
        state.userInfo.email = action.payload.email;
        state.userInfo.gender = action.payload.gender;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userInfoReducer = userInfoSlice.reducer;
