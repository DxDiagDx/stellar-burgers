import { TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getUser, loginUser, logout, registerUser, updateUser } from './action';
import { TRegisterData } from '@api';

type TAuthState = {
  user: TUser | null;
  registerData: TRegisterData;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
};

export const initialState: TAuthState = {
  user: null,
  registerData: {
    email: '',
    name: '',
    password: ''
  },
  isAuthChecked: true,
  isAuthenticated: false,
  error: null,
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getLoading: (state) => state.loading,
    getUserData: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsAuthenticated: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = action.payload.success;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = action.payload.success;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = action.payload.success;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = action.payload.success;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
        state.error = null;
      });
  }
});

export const { getUserData, getIsAuthChecked, getIsAuthenticated, getLoading } =
  userSlice.selectors;
