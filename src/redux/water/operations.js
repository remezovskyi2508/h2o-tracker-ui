import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectToken } from '../auth/selectors';

const BASE_URL = 'https://h2o-tracker-api.onrender.com';

export const fetchWaterToday = createAsyncThunk(
  'water/fetchToday',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('Користувач не авторизований!');
      };

      const { data } = await axios.get(`${BASE_URL}/water/today`, {
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

export const fetchWaterMonth = createAsyncThunk(
  'water/fetchMonth',
  async ({year, month}, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = selectToken(state);

    try {
      const {data} = await axios.get(`${BASE_URL}/water/month?year=${year}&month=${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch(err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);