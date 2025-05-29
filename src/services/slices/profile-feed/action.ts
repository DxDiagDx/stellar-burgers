import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const getProfileFeed = createAsyncThunk(
  'feeds/getProfileFeed',
  async () => await getOrdersApi()
);
