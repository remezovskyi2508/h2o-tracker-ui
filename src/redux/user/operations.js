import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseToken } from '../../js/calendar.js';

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
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const response = await authInstance.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'userInfo/updateUserData',
  async ({ id, data }, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const response = await authInstance.patch(`/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'userInfo/updateUserAvatar',
  async ({ id, formData }, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const response = await authInstanceAvatar.patch(
        `/users/${id}/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
