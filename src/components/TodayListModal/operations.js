import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: '',
  withCredentials: true,
});

export const addWater = createAsyncThunk(
  'water/add',
  async (waterData, thunkAPI) => {
    try {
      const { data } = await instance.post('/waters', waterData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/edit',
  async ({ id, amount, date }, thunkAPI) => {
    try {
      const { data } = await instance.patch(`/waters/${id}`, { amount, date });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
