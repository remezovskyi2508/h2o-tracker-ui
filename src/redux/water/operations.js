import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '$2a$10$Om5R.JM8sNAnQB7vubqipu9nY6Tc2.Ck/YStGtXm/k0tJQ/xNaro.';

const authInstance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/',
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': API_KEY, // Додаємо API-ключ в заголовки
  },
});

export const fetchWaterData = createAsyncThunk(
  'water/fetchData',
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get('b/67a106ddacd3cb34a8d7b651');
      const result = data.record.days;
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
