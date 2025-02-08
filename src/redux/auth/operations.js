import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const authInstance = axios.create({
  baseURL: 'https://h2o-tracker-api.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
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
      console.log('RegisterData: ', data);
      setToken(data.token);
      return data;
    } catch (error) {
      console.error('Error response: ', error.response);
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
      console.log('LoginData: ', data);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await authInstance.post('/users/logout');

    clearToken();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//add functio to autoLogin
export const resetPassword = createAsyncThunk(
  'auth/reset-pwd',
  async (formData, thunkAPI) => {
    // {
    //   "oldPassword": "password123",
    //   "newPassword": "password098"
    // }
    try {
      const { data } = await authInstance.put('/auth/reset-pwd', formData);
      console.log('ResetData: ', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
