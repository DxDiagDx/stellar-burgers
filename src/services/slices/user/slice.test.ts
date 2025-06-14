import { initialState, userSlice, TAuthState } from './slice';
import { registerUser, loginUser, getUser, updateUser, logout } from './action';

const user = {
  email: 'test@mail.ru',
  name: 'User Name'
};
const userResponse = {
  success: true,
  user: user
};
const registerData = {
  email: 'test@mail.ru',
  name: 'User Name',
  password: '12345678'
};
const loginData = {
  email: 'test@mail.ru',
  password: '12345678'
};
const authResponse = {
  success: true,
  refreshToken: 'refreshToken',
  accessToken: 'accessToken',
  user: user
};

const fulfilledExpect = (state: TAuthState) => {
  expect(state.loading).toBe(false);
  expect(state.isAuthChecked).toBe(true);
  expect(state.isAuthenticated).toBe(true);
  expect(state.user).toEqual(user);
  expect(state.error).toBe(null);
};

describe('Тестируем редьюсер слайса userSlice', () => {
  it('Тест getUser fulfilled', () => {
    const newState = userSlice.reducer(
      initialState,
      getUser.fulfilled(userResponse, '')
    );
    fulfilledExpect(newState);
  });

  it('Тест registerUser fulfilled', () => {
    const newState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(authResponse, '', registerData)
    );
    fulfilledExpect(newState);
  });

  it('Тест loginUser fulfilled', () => {
    const newState = userSlice.reducer(
      initialState,
      loginUser.fulfilled(authResponse, '', loginData)
    );
    fulfilledExpect(newState);
  });

  it('Тест updateUser fulfilled', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.fulfilled(authResponse, '', loginData)
    );
    fulfilledExpect(newState);
  });

  it('Тест logout fulfilled', () => {
    const state = {
      ...initialState,
      user: user
    };

    const newState = userSlice.reducer(state, logout.fulfilled(undefined, ''));

    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.loading).toEqual(false);
    expect(newState.user).toEqual(null);
    expect(newState.error).toEqual(null);
  });
});
