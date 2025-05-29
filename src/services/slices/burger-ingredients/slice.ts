import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './action';

export type TBurgerIngredientsSlice = {
  loading: boolean;
  ingredients: TIngredient[];
  error: string | null | undefined;
};

export const initialState: TBurgerIngredientsSlice = {
  loading: false,
  ingredients: [],
  error: null
};

export const burgerIngredientsSlice = createSlice({
  name: 'burger-ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsItems: (state) => state.ingredients,
    getLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = '';
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.ingredients = [];
        state.error = action.error.message;
      });
  }
});

export const { getIngredientsItems, getLoading } =
  burgerIngredientsSlice.selectors;
