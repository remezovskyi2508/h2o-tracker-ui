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
      const token = localStorage.getItem('accessToken');
      const { data } = await waterInstance.get('/water/today', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return data.records;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterMonth = createAsyncThunk(
  'water/fetchMonth',
  async ({year, month}, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');
      const { data } = await waterInstance.get(`/water/month?year=${year}&month=${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async ({date, waterVolume}, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await waterInstance.post(`/water`, {date, waterVolume}, {
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

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await waterInstance.delete(`/water/${id}`, {
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

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({id, waterVolume}, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await waterInstance.post(`/water/${id}`, {waterVolume}, {
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
