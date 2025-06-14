import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getProfileFeed } from './action';

type TProfileFeedState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const initialState: TProfileFeedState = {
  orders: [],
  loading: false,
  error: null
};

export const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrders: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileFeed.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getProfileFeed.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.loading = false;
      })
      .addCase(getProfileFeed.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const { getProfileOrders } = profileFeedSlice.selectors;
