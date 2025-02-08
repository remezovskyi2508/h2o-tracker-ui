import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const authInstance = axios.create({
  baseURL: 'https://h2o-tracker-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
const authInstanceAvatar = axios.create({
  baseURL: 'https://h2o-tracker-api.onrender.com',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const fetchUserInfo = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async (id, thunkAPI) => {
    try {
      const { data } = await authInstance.get(`/users/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserInfo = createAsyncThunk(
  'userInfo/updateUserData',
  async (formData, thunkAPI) => {
    try {
      const { data } = await authInstance.patch(
        `/users/${formData.id}`,
        formData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'userInfo/updateUserAvatar',
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await authInstanceAvatar.patch(
        `/users/${id}/avatar`,
        formData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'userInfo/updateUserPassword',
  async (formData, thunkAPI) => {
    try {
      const { data } = await authInstance.put(`/auth/reset-pwd`, formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
