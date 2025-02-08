import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const waterInstance = axios.create({
  baseURL: 'https://h2o-tracker-api.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchWaterToday = createAsyncThunk(
  'water/fetchToday',
  async (_, thunkAPI) => {
    try {
      const { data } = await waterInstance.get('/water/today');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterMonth = createAsyncThunk(
  'water/fetchMonth',
  async ({year, month}, thunkAPI) => {
    try {
      const {data} = await waterInstance.get(`/water/month?year=${year}&month=${month}`);
      return data;
    } catch(err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async ({date, waterVolume}, thunkAPI) => {
    try {
      const response = await waterInstance.post(`/water`, {date, waterVolume});
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      const response = await waterInstance.delete(`/water/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({id, waterVolume}, thunkAPI) => {
    try {
      const response = await waterInstance.post(`/water/${id}`, {waterVolume});
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
)