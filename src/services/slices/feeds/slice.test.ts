import { initialState, feedsSlice } from './slice';
import { getFeeds } from './action';

describe('Тестируем редьюсер слайса feeds', () => {
  it('Экшен pending', () => {
    const newState = feedsSlice.reducer(initialState, getFeeds.pending(''));

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('Экшен fulfilled', () => {
    const orders = [
      {
        _id: '79654',
        ingredients: ['ingredient 1', 'ingredient 2'],
        owner: '12345',
        status: 'done',
        name: 'Бургер',
        createdAt: '2025-05-22',
        updatedAt: '2025-05-22',
        number: 78510,
        __v: 0
      }
    ];
    const total = 1;
    const totalToday = 1;
    const feedResponse = {
      success: false,
      orders: orders,
      total: total,
      totalToday: totalToday
    };

    const newState = feedsSlice.reducer(
      initialState,
      getFeeds.fulfilled(feedResponse, '')
    );

    expect(newState).toEqual({
      orders: orders,
      total: total,
      totalToday: totalToday,
      loading: false,
      error: null
    });
  });

  it('Экшен rejected', () => {
    const error = new Error('error');

    const newState = feedsSlice.reducer(
      initialState,
      getFeeds.rejected(error, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error');
  });
});
