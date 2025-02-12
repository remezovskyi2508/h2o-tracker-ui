import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseToken } from '../../js/calendar';

export const authInstance = axios.create({
  baseURL: 'https://h2o-tracker-api.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const setToken = token => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    // {
    //     "email": "across@mail.com",
    //     "password": "examplepwd12345"
    // }
    try {
      const { data } = await authInstance.post('/auth/register', formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    // {
    //     "email": "across@mail.com",
    //     "password": "examplepwd12345"
    // }
    try {
      const { data } = await authInstance.post('/auth/login', formData);
      const accessToken = data.data.accessToken;
      setToken(accessToken);
      console.log();
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await authInstance.post('/auth/logout');
    clearToken();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const userRefresh = createAsyncThunk(
  'users/current',
  async (_, thunkAPI) => {
    try {
      const persistToken = localStorage.getItem('persist:auth');
      const token = parseToken(persistToken);
      const { data } = await authInstance.get('/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const accessToken = data.data.accessToken;
      console.log('Operation Token: ', data);
      setToken(accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
