import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseToken } from '../../js/calendar';

export const waterInstance = axios.create({
  baseURL: 'https://h2o-tracker-api.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchWaterToday = createAsyncThunk(
  'water/fetchToday',
  async (_, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const { data } = await waterInstance.get('/water/today', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterMonth = createAsyncThunk(
  'water/fetchMonth',
  async ({ year, month }, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const { data } = await waterInstance.get(
        `/water/month?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async ({ date, waterVolume }, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const response = await waterInstance.post(
        `/water`,
        { date, waterVolume },
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

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
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
  async ({ id, waterVolume, date }, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const response = await waterInstance.patch(
        `/water/${id}`,
        { waterVolume, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const dailyNormUpd = createAsyncThunk(
  'water/water-rate',
  async ({ dailyNorm }, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const response = await waterInstance.patch(
        `/water/water-rate`,
        { dailyNorm },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
