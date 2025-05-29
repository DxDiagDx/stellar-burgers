import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const orderBurgerByNumber = createAsyncThunk(
  'orders/orderBurgerByNumber',
  async (number: number) => getOrderByNumberApi(number)
);
