import { initialState as initialStateBurgerConstructor } from './slices/burger-constructor/slice';
import { initialState as initialStateBurgerIngredients } from './slices/burger-ingredients/slice';
import { initialState as initialStateFeeds } from './slices/feeds/slice';
import { initialState as initialStateOrder } from './slices/order/slice';
import { initialState as initialStateProfileFeed } from './slices/profile-feed/slice';
import { initialState as initialStateUser } from './slices/user/slice';
import store from './store';

const initialState = {
  'burger-constructor': initialStateBurgerConstructor,
  'burger-ingredients': initialStateBurgerIngredients,
  feeds: initialStateFeeds,
  order: initialStateOrder,
  profileFeed: initialStateProfileFeed,
  user: initialStateUser
};

describe('Тестируем правильную инициализацию rootReducer', () => {
  it('Тест инициализации', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('Тест экшена, который не обрабатывается ни одним редьюсером', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    store.dispatch(action);
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});
