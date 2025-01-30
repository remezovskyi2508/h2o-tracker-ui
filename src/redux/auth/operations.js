import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const authInstance = axios.create({
  baseURL: '',
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
    //     "name": "Adrian Cross",
    //     "email": "across@mail.com",
    //     "password": "examplepwd12345"
    // }
    try {
      const { data } = await authInstance.post('/users/signup', formData);
      console.log('Data: ', data);
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
    //     //     "name": "Adrian Cross",
    //     //     "email": "across@mail.com",
    // }
    try {
      const { data } = await authInstance.post('/users/login', formData);
      console.log('Data: ', data);
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
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token providen to refresh user data');
    }

    try {
      setToken(token);
      const { data } = await authInstance.get('/users/current');
      console.log('Data: ', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
