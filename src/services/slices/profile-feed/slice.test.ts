import { initialState, profileFeedSlice } from './slice';
import { getProfileFeed } from './action';

const order = {
  _id: '79654',
  ingredients: ['ingredient 1', 'ingredient 2'],
  owner: '12345',
  status: 'done',
  name: 'Бургер',
  createdAt: '2025-05-22',
  updatedAt: '2025-05-22',
  number: 78510,
  __v: 0
};
const orders = [order];
const error = new Error('error');

describe('Тестируем редьюсер слайса profileFeedSlice', () => {
  it('Тест getProfileFeed pending', () => {
    const newState = profileFeedSlice.reducer(
      initialState,
      getProfileFeed.pending('')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('Тест getProfileFeed fulfilled', () => {
    const newState = profileFeedSlice.reducer(
      initialState,
      getProfileFeed.fulfilled(orders, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.orders).toEqual(orders);
  });

  it('Тест getProfileFeed rejected', () => {
    const newState = profileFeedSlice.reducer(
      initialState,
      getProfileFeed.rejected(error, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error');
  });
});
