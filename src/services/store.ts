import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './slices/burger-ingredients/slice';
import { burgerConstructorSlice } from './slices/burger-constructor/slice';
import { userSlice } from './slices/user/slice';
import { feedsSlice } from './slices/feeds/slice';
import { profileFeedSlice } from './slices/profile-feed/slice';
import { orderSlice } from './slices/order/slice';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  userSlice,
  feedsSlice,
  profileFeedSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
