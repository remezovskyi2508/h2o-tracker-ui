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
      const accessToken = data.data.accessToken;
      setToken(accessToken);
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

// export const refreshUser = createAsyncThunk(
//   'auth/refreshUser',
//   async (_, thunkAPI) => {
//     const persistedToken = thunkAPI.getState().auth.token;

//     if (!persistedToken) {
//       return thunkAPI.rejectWithValue('Failed to refresh user');
//     }

//     try {
//       const { data } = await authInstance.get('/user/current');

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );
