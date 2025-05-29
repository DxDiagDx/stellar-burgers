import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk(
  'burger-ingredients/getIngredients',
  async () => getIngredientsApi()
);
