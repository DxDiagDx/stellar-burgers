import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const dataUser = await registerUserApi(data);
    setCookie('accessToken', dataUser.accessToken);
    localStorage.setItem('refreshToken', dataUser.refreshToken);
    return dataUser;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const dataUser = await loginUserApi(data);
    setCookie('accessToken', dataUser.accessToken);
    localStorage.setItem('refreshToken', dataUser.refreshToken);
    return dataUser;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logout = createAsyncThunk(
  'user/logout',
  async () =>
    await logoutApi().then(() => {
      deleteCookie('accessToken');
      // deleteCookie('refreshToken');
      localStorage.clear();
    })
);
