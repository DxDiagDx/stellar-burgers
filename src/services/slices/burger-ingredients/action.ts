import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';

export const getIngredients = createAsyncThunk(
  'burger-ingredients/getIngredients',
  async () => getIngredientsApi()
);
