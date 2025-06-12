import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { orderBurger, orderBurgerByNumber } from './action';

type TOrderState = {
  orderByNumber: TOrder | null;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  orderByNumber: null,
  orderModalData: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
        state.orderRequest = false;
      })
      .addCase(orderBurgerByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurgerByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderByNumber = action.payload.orders[0];
      })
      .addCase(orderBurgerByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      });
  }
});

export const { getOrderRequest, getOrderModalData } = orderSlice.selectors;
export const { setOrderRequest, setOrderModalData } = orderSlice.actions;
