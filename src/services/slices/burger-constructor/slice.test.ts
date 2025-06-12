import { burgerConstructorSlice } from './slice';
import {
  initialState,
  addIngredientInConstructor,
  removeIngredientFromConstructor,
  moveDownIngredient,
  moveUpIngredient
} from './slice';

describe('Тестируем редьюсер слайса burger-constructor', () => {
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

  const ingredientMore = {
    _id: '2',
    id: '2',
    name: 'Ингредиент Второй',
    type: 'ingredient',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
  };

  it('Добавления ингредиента', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredientInConstructor(ingredient)
    );

    const expectedState = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient]
    };

    expect(newState).toEqual(expectedState);
  });

  it('Удаление ингредиента', () => {
    const currentState = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient]
    };

    const newState = burgerConstructorSlice.reducer(
      currentState,
      removeIngredientFromConstructor(ingredient.id)
    );

    expect(newState).toEqual(initialState);
  });

  it('Изменение порядка ингредиентов - перемещение вниз', () => {
    const currentState = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient, ingredientMore]
    };

    const expectedState = burgerConstructorSlice.reducer(
      currentState,
      moveDownIngredient(ingredient.id)
    );

    expect(expectedState).toEqual({
      bun: null,
      ingredients: [...initialState.ingredients, ingredientMore, ingredient]
    });
  });

  it('Изменение порядка ингредиентов - перемещение вверх', () => {
    const currentState = {
      ...initialState,
      ingredients: [...initialState.ingredients, ingredient, ingredientMore]
    };

    const expectedState = burgerConstructorSlice.reducer(
      currentState,
      moveUpIngredient(ingredientMore.id)
    );

    expect(expectedState).toEqual({
      bun: null,
      ingredients: [...initialState.ingredients, ingredientMore, ingredient]
    });
  });
});
