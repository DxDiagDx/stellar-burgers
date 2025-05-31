import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  async () => await getFeedsApi()
);
