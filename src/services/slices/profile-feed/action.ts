import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../../utils/burger-api';

export const getProfileFeed = createAsyncThunk(
  'feeds/getProfileFeed',
  async () => await getOrdersApi()
);
