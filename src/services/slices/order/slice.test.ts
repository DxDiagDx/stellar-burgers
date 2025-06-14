import { initialState, orderSlice } from './slice';
import { orderBurger, orderBurgerByNumber } from './action';

const ingredient = {
  _id: '1',
  id: '1',
  name: 'Ингредиент',
  type: 'ingredient',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

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

const orderResponse = {
  success: true,
  order: order,
  name: 'Бургер',
  orders: orders
};

const error = new Error('error');

describe('Тестируем редьюсер слайса orderSlice', () => {
  it('Тест orderBurger pending', () => {
    const newState = orderSlice.reducer(
      initialState,
      orderBurger.pending('', [])
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.orderRequest).toBe(true);
  });

  it('Тест orderBurger fulfilled', () => {
    const newState = orderSlice.reducer(
      initialState,
      orderBurger.fulfilled(orderResponse, '', [ingredient.id])
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toEqual(order);
  });

  it('Тест orderBurger rejected', () => {
    const newState = orderSlice.reducer(
      initialState,
      orderBurger.rejected(error, '', [ingredient._id])
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error');
    expect(newState.orderRequest).toBe(false);
  });

  it('Тест orderBurgerByNumber pending', () => {
    const newState = orderSlice.reducer(
      initialState,
      orderBurgerByNumber.pending('', order.number)
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('Тест orderBurgerByNumber fulfilled', () => {
    const newState = orderSlice.reducer(
      initialState,
      orderBurgerByNumber.fulfilled(orderResponse, '', order.number)
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.orderByNumber).toEqual(order);
  });

  it('Тест orderBurgerByNumber rejected', () => {
    const newState = orderSlice.reducer(
      initialState,
      orderBurgerByNumber.rejected(error, '', order.number)
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error');
  });
});
