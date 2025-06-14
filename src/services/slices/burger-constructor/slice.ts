import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { orderBurger } from '../order/action';

export type TBurgerConstructorSlice = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorSlice = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  selectors: {
    getConstructorBun: (state) => state.bun,
    getConstructorIngredients: (state) => state.ingredients
  },
  reducers: {
    addIngredientInConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      action.payload.type === 'bun'
        ? (state.bun = action.payload)
        : state.ingredients.push(action.payload);
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveDownIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.ingredients.splice(ingredientIndex, 1);
      state.ingredients.splice(ingredientIndex + 1, 0, ingredient);
    },
    moveUpIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.ingredients.splice(ingredientIndex, 1);
      state.ingredients.splice(ingredientIndex - 1, 0, ingredient);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const {
  addIngredientInConstructor,
  removeIngredientFromConstructor,
  moveDownIngredient,
  moveUpIngredient
} = burgerConstructorSlice.actions;

export const { getConstructorBun, getConstructorIngredients } =
  burgerConstructorSlice.selectors;
