import { initialState, burgerIngredientsSlice } from './slice';
import { getIngredients } from './action';

describe('Тестируем редьюсер слайса burger-ingredients', () => {
  it('Экшен pending', () => {
    const newState = burgerIngredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );

    expect(newState.loading).toBe(true);
  });

  it('Экшен fulfilled', () => {
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
    const ingredients = [ingredient];

    const newState = burgerIngredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled(ingredients, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.error).toBe('');
  });

  it('Экшен rejected', () => {
    const error = new Error('error');

    const newState = burgerIngredientsSlice.reducer(
      initialState,
      getIngredients.rejected(error, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual([]);
    expect(newState.error).toBe('error');
  });
});
